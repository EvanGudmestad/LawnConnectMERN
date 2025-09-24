import express from 'express';
const app = express();
import debug from 'debug';
import {ping} from './database.js';
const debugIndex = debug('app:index');
const port = process.env.PORT || 8080;

//ping();

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(express.static('frontend/dist'));
app.use('/api/companies',(await import('./routes/api/company.js')).companyRouter);
app.use('/api/jobs', (await import('./routes/api/job.js')).jobRouter);
app.use('/api/users', (await import('./routes/api/users.js')).usersRouter);

app.listen(port, () => {
  debugIndex(`Example app listening on port http://localhost:${port}`)
})
