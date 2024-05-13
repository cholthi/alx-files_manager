import express from 'express';
import { env } from 'process';

const routes = require('./routes/index');

const app = express();
const port = env.PORT || 5000;
app.use(express.json());
app.use(routes);
app.listen(port, '127.0.0.1');

export default app;
