import express from 'express';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import viewRouter from './routes/view.routes.js';
import uniqeUser from './middlewares/uniqeUser.js';
import connectDB from './database/db.js';
import creatUrlRouter from './routes/creatUrl.route.js';
import shortUrlModel from './models/shortUrl.model.js';

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


// For redirecting 
app.get('/:uuid', async (req, res) => {
    const userParam = req.params.uuid;
    const { userAgent, ipAddress } = req.body;

    try {
        const url = await shortUrlModel.findOne({ shortenedUrl: userParam });
        // console.log("URL: ", url);
        if (!url) return res.render('pages/not_found');

        url.recordClick(userAgent, ipAddress);
        res.redirect(url.originalUrl);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

// Handeling the view routes
app.use('/', uniqeUser, viewRouter); // Apply the middleware only to viewRouter

// Creating Short Url
app.use('/create', creatUrlRouter);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));