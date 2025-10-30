import express from 'express';
const app = express();
import debug from 'debug';
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
//Sign in with Google: POST /api/auth/sign-in/social
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use('/api/jobs', (await import('./routes/api/job.js')).jobRouter);
app.use('/api/users', (await import('./routes/api/users.js')).usersRouter);
app.use('/api/services', (await import('./routes/api/service.js')).serviceRouter);
app.use('/api/transactions', (await import('./routes/api/transaction.js')).transactionRouter);
app.use('/api/job-applications', (await import('./routes/api/jobApplication.js')).jobApplicationRouter);

app.listen(port, () => {
  debugIndex(`Example app listening on port http://localhost:${port}`)
})
