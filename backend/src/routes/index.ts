import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';
import TokenGenerator from '../helpers/TokenGenerator';
import LoginValidator from '../validators/LoginValidator';
import CablewayController from '../controllers/CablewayController';
import CablewayService from '../services/CablewayService';

const loginValidator = new LoginValidator();
const tokenGenerator = new TokenGenerator();
const loginService = new LoginService(loginValidator);
const loginController = new LoginController(loginService, tokenGenerator);
const cablewayService = new CablewayService();
const cablewayController = new CablewayController(cablewayService);

const router = Router();

router.post('/login', async (req, res, next) => {
  return loginController.login(req, res, next);
})

router.get('/cableway/:id', async (req, res, next) => {
  return cablewayController.getById(req, res, next);
})

router.get('/cableway', async (req, res,) => {
  return cablewayController.getAll(req, res);
})

export default router;