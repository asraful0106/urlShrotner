import express from 'express';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import { UAParser } from 'ua-parser-js';
import viewRouter from './routes/view.routes.js';
import uniqeUser from './middlewares/uniqeUser.js';
import connectDB from './database/db.js';
import creatUrlRouter from './routes/creatUrl.route.js';
import shortUrlModel from './models/shortUrl.model.js';
import shortUrlRouter from './routes/shrot_url.route.js';

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


// For redirecting 
app.get('/:uuid', async (req, res) => {
    const userParam = req.params.uuid;
    const parser = new UAParser();
    const userAgent = req.headers['user-agent'];
    const uaResult = parser.setUA(userAgent).getResult();
    // console.log(uaResult.os.name); // e.g., 'Windows', 'Mac OS', 'Android'
    // console.log(uaResult.device.type);
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;

    try {
        const url = await shortUrlModel.findOne({ shortenedUrl: userParam });
        // console.log("URL: ", url);
        if (!url) return res.render('pages/404', setMetaData(
            "Page Not Found | URL Shrotner",
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ));

        url.recordClick(uaResult.os.name, ipAddress);
        res.redirect(url.originalUrl);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});


// Creating Short Url
app.use('/create', creatUrlRouter);

// Short Url Route
app.use('/api/statistics', shortUrlRouter);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));