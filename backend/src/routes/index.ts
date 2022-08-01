import { Router } from 'express';
import LoginController from '../controllers/UserController';
import UserService from '../services/UserService';
import TokenGenerator from '../helpers/TokenGenerator';
import LoginValidator from '../validators/LoginValidator';
import CablewayController from '../controllers/CablewayController';
import CablewayService from '../services/CablewayService';
import UserValidator from '../validators/UserValidator';

const loginValidator = new LoginValidator();
const userValidator = new UserValidator();
const tokenGenerator = new TokenGenerator();
const loginService = new LoginService(loginValidator);
const loginController = new LoginController(loginService, tokenGenerator);
const cablewayService = new CablewayService();
const cablewayController = new CablewayController(cablewayService);
const userService = new UserService(loginValidator, userValidator);
const userController = new LoginController(userService, tokenGenerator);

const router = Router();

router.post('/login', async (req, res, next) => {
  return userController.login(req, res, next);
})

router.post('/register',async (req, res, next) => {
  return userController.register(req, res, next);
})

router.get('/cableway/:id', async (req, res, next) => {
  return cablewayController.getById(req, res, next);
})

router.get('/cableway', async (req, res,) => {
  return cablewayController.getAll(req, res);
})

export default router;