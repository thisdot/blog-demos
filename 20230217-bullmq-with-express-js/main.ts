import express from 'express';
import { addJobToQueue } from './queue';

const app = express()
const port = 3000


app.post('/', async (req: Request, res: Response, next: NextFunction) => {
	const job = await addJobToQueue(req.body);
	res.json({ jobId: job.id });
	return next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})