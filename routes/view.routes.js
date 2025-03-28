import { Router } from 'express';
import { homeView } from '../controllers/view.controller.js';

const viewRouter = Router();

viewRouter.get('/', (req, res) => {
    homeView(req, res);
});

export default viewRouter;