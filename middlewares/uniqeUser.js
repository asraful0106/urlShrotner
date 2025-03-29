import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';

const uniqeUser = async (req, res, next) => {
    const token = req.cookies?.urlShortnerToken;
    if (!token) {
        const uniqeId = uuidv4();
        const token = jwt.sign({ uniqeId: uniqeId }, process.env.SECRET_KEY);
        try {
            const user = new userModel({ uniqeId: uniqeId });
            await user.save();
            // console.log("User is saved!")
            res.cookie('urlShortnerToken', token);
        } catch (err) {
            // console.log("Failed to create user!", err);
        }
    }
    next();
}

export default uniqeUser;