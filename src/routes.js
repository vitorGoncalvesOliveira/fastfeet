import { Router } from 'express';

import SessionController from './app/controller/SessionController';
import RecipientController from './app/controller/RecipientController';
import auth from './app/middlewares/auth';
import Recipient from './app/models/Recipient';

const router = new Router();

router.get('/', (req, res) => {
  res.json({ HELLO: 'Fast Feet' });
});

router.post('/session', SessionController.store);

router.use(auth);
router.get('/recipient', RecipientController.index);
router.post('/recipient', RecipientController.store);
router.put('/recipient/:id', RecipientController.update);

export default router;
