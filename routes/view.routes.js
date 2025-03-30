import { Router } from 'express';
import { homeView, historyView } from '../controllers/view.controller.js';
import setMetaData from '../helpers/meataData.js';

const viewRouter = Router();

viewRouter.get('/', async (req, res) => {
    homeView(req, res);
});
viewRouter.get('/history', async (req, res) => {
    historyView(req, res);
});

viewRouter.get('*', async (req, res) => {
    res.status(404).render('pages/404', setMetaData(
        "Page Not Found | URL Shrotner",
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ));
});

export default viewRouter;