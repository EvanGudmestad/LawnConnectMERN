import express from 'express';
const app = express();
import debug from 'debug';
const debugIndex = debug('app:index');
import {companyRouter} from './routes/api/company.js';
import { jobRouter } from './routes/api/job.js';
import path from 'path';    
import { fileURLToPath } from 'url';
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true })); //Middleware
//Data from a form
// name=John&age=30

app.use(express.json()); //Middleware
//accept json to the req.body

app.use(express.static('frontend/dist'));

app.use('/api/companies', companyRouter);
app.use('/api/jobs', jobRouter);

// Serve React index.html for all other routes (SPA support)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(port, () => {
  debugIndex(`Example app listening on port http://localhost:${port}`)
})
