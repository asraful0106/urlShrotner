import setMetaData from "../helpers/meataData.js";
import jwt from 'jsonwebtoken';
import shortUrlModel from "../models/shortUrl.model.js";

const homeView = async (req, res) => {
    res.render('pages/index', setMetaData(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ));
}

const historyView = async (req, res) => {
    let history = [];
    try {
        const token = req.cookies?.urlShortnerToken;
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        history = await shortUrlModel.find({ uniqeId: decode.uniqeId })
            .select('originalUrl shortenedUrl');
        // console.log("History: ", history);
    } catch (err) {
        // console.log(err);
    }
    res.render('pages/history', {...setMetaData(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ), history});
}

export { homeView, historyView };