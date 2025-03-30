import express from 'express';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import viewRouter from './routes/view.routes.js';
import uniqeUser from './middlewares/uniqeUser.js';
import connectDB from './database/db.js';
import creatUrlRouter from './routes/creatUrl.route.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// CORS 
app.use(cors());

// For parsing JSON bodies
app.use(express.json());

// For parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Making public folder accessible
app.use(express.static('public'));

// Middleware for cookies
app.use(cookieParser());

// Seting up ejs view engine
app.set('view engine', 'ejs');

// Connect Databse
connectDB();

// Handeling the view routes
app.use('/', uniqeUser, viewRouter); // Apply the middleware only to viewRouter

// Creating Short Url
app.use('/create', creatUrlRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));