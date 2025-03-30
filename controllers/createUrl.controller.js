import crypto from "crypto";
import jwt from "jsonwebtoken";
import shortUrlModel from "../models/shortUrl.model.js";

const createUrl = async (req, res) => {
    const { originalUrl } = req.body;
    const token = req.cookies?.urlShortnerToken;

    if (!originalUrl) {
        res.status(404).json({ message: "We did not get any url!" });
    }

    if (!token) {
        res.status(401).json({ message: "You are not authenticated!" });
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        const existingUrl = await shortUrlModel.findOne({ originalUrl, uniqeId: decode.uniqeId });

        if (existingUrl) {
            return res.status(200).json({ shortenedUrl: existingUrl.shortenedUrl });
        }

        const shortenedUrl = crypto.randomBytes(6).toString('hex');
        const newShortenedUrl = new shortUrlModel({
            originalUrl,
            shortenedUrl: shortenedUrl,
            uniqeId: decode.uniqeId
        });

        await newShortenedUrl.save();
        res.status(201).json({ shortenedUrl });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });

    }

}

export { createUrl };