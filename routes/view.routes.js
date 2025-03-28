import { Router } from 'express';
import { homeView } from '../controllers/view.controller.js';
import setMetaData from '../helpers/meataData.js';

const viewRouter = Router();

viewRouter.get('/', (req, res) => {
    homeView(req, res);
});

viewRouter.get('*', (req, res) =>{
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