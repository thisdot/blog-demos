# Node Redis Scheduler

This is a small proof of concept to show how Redis can be utilized to create a scheduler in Node.js.

To run it, make sure you have Docker installed. Then run:

```shell
npm install
docker-compose up
```

In a new shell, run:

```shell
node index.js
```

This will run the scheduler and submit a single task.