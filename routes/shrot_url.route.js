import { Router } from 'express';
import { getUrlStatistic } from '../controllers/shortUrlController.js';

const shortUrlRouter = Router();

shortUrlRouter.get('/:uuid', async (req, res) => {
    getUrlStatistic(req, res);
});

export default shortUrlRouter;