import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';
import TokenGenerator from '../helpers/TokenGenerator';
import LoginValidator from '../validators/LoginValidator';

const loginValidator = new LoginValidator();
const tokenGenerator = new TokenGenerator();
const loginService = new LoginService(loginValidator);
const loginController = new LoginController(loginService, tokenGenerator);

const router = Router();

router.post('/login', async (req, res, next) => {
  return loginController.login(req, res, next);
})

export default router;