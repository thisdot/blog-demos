const Redis = require('ioredis');

function RedisApi(host, port) {
  const redis = new Redis(port, host, { maxRetriesPerRequest: 3 });

  return {
    getFirstInSortedSet: async (sortedSetKey) => {
      const results = await redis.zrange(
        sortedSetKey,
        0,
        new Date().getTime(),
        'BYSCORE',
        'LIMIT',
        0,
        1
      );

      return results?.length ? results[0] : null;
    },
    addToSortedSet: (sortedSetKey, member, score) => {
      return redis.zadd(sortedSetKey, score, member);
    },
    removeFromSortedSet: (sortedSetKey, member) => {
      return redis.zrem(sortedSetKey, member);
    },
    increaseCounter: (counterKey) => {
      return redis.incr(counterKey);
    },
    setString: (stringKey, value) => {
      return redis.set(stringKey, value, 'GET');
    },
    getString: (stringKey) => {
      return redis.get(stringKey);
    },
    removeString: (stringKey) => {
      return redis.del(stringKey);
    },
    isConnected: async () => {
      try {
        // Just get some dummy key to see if we are connected
        await redis.get('dummy');
        return true;
      } catch (e) {
        return false;
      }
    },
  };
}

function Scheduler(
  pollingIntervalInSec,
  taskHandler,
  redisHost,
  redisPort = 6379
) {
  const redisApi = new RedisApi(redisPort, redisHost);

  let isRunning = false;

  return {
    schedule: async (data, timestamp) => {
      const taskId = await redisApi.increaseCounter('taskCounter');
      console.log(
        `Scheduled new task with ID ${taskId} and timestamp ${timestamp}`,
        data
      );
      await redisApi.setString(`task:${taskId}`, JSON.stringify(data));
      await redisApi.addToSortedSet('sortedTasks', taskId, timestamp);
    },
    start: async () => {
      console.log('Started scheduler');
      isRunning = true;

      const findNextTask = async () => {
        const isRedisConnected = await redisApi.isConnected();
        if (isRunning && isRedisConnected) {
          console.log('Polling for new tasks');

          let taskId;
          do {
            taskId = await redisApi.getFirstInSortedSet('sortedTasks');

            if (taskId) {
              console.log(`Found task ${taskId}`);
              const taskData = await redisApi.getString(`task:${taskId}`);
              try {
                console.log(`Passing data for task ${taskId}`, taskData);
                taskHandler(JSON.parse(taskData));
              } catch (err) {
                console.error(err);
              }
              redisApi.removeString(`task:${taskId}`);
              redisApi.removeFromSortedSet('sortedTasks', taskId);
            }
          } while (taskId);

          setTimeout(findNextTask, pollingIntervalInSec * 1000);
        }
      };

      findNextTask();
    },
    stop: () => {
      isRunning = false;
      console.log('Stopped scheduler');
    },
  };
}

const scheduler = new Scheduler(
  5,
  (taskData) => {
    console.log('Handled task', taskData);
  },
  'localhost'
);
scheduler.start();

// Submit a task to execute 10 seconds later
scheduler.schedule({ name: 'Test data' }, new Date().getTime() + 10000);
