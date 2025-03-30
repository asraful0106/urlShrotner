import setMetaData from "../helpers/meataData.js";

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
    res.render('pages/history', setMetaData(
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

export { homeView, historyView };