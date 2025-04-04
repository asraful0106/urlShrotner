import shortUrlModel from "../models/shortUrl.model.js"

const getUrlStatistic = async (req, res) => {
    const userParam = req.params.uuid;
    try{
        const clicks = await shortUrlModel.find({ shortenedUrl: userParam });
        // console.log(userParam);
        // console.log(clicks);
        res.send(clicks);
    }catch(err){

    }
}

export { getUrlStatistic }