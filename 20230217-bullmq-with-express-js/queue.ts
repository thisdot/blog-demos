import { Queue, Job } from 'bullmq';
import { 	
	REDIS_QUEUE_HOST,
	REDIS_QUEUE_PORT,
} from './config.constants';
import { setUpWorker } from './worker';

export const myQueue = new Queue('my-queue', {
	connection: {
		host: REDIS_QUEUE_HOST,
		port: REDIS_QUEUE_PORT,
	},
});

const DEFAULT_REMOVE_CONFIG = {
	removeOnComplete: {
		age: 3600,
	},
	removeOnFail: {
		age: 24 * 3600,
	},
};


setUpWorker();

export async function addJobToQueue<T>(data: T): Promise<Job<T>> {
	return myQueue.add('job', data, DEFAULT_REMOVE_CONFIG);
}