import express from 'express';
const app = express();
import debug from 'debug';
import {ping} from './database.js';
const debugIndex = debug('app:index');
import cors from 'cors';
const port = process.env.PORT || 8080;
import { auth } from "./auth.js"; // Import your Better Auth instance
import { toNodeHandler } from "better-auth/node";


app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:8080", "https://lawnconnect-service-294349793000.us-central1.run.app"],
  credentials: true
})); 
app.use(express.static('frontend/dist'));

// Add better-auth handler - this handles all auth endpoints including cookies
//Login: POST /api/auth/sign-in/email
//Registration: POST /api/auth/sign-up/email
//Get Session: GET /api/auth/get-session
//Logout: POST /api/auth/sign-out
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use('/api/companies',(await import('./routes/api/company.js')).companyRouter);
app.use('/api/jobs', (await import('./routes/api/job.js')).jobRouter);
//app.use('/api/users', (await import('./routes/api/users.js')).usersRouter);

app.listen(port, () => {
  debugIndex(`Example app listening on port http://localhost:${port}`)
})
