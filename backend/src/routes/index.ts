import { Router } from 'express';
import LoginController from '../controllers/UserController';
import UserService from '../services/UserService';
import TokenGenerator from '../helpers/TokenGenerator';
import LoginValidator from '../validators/LoginValidator';
import UserValidator from '../validators/UserValidator';

const loginValidator = new LoginValidator();
const userValidator = new UserValidator();
const tokenGenerator = new TokenGenerator();
const userService = new UserService(loginValidator, userValidator);
const userController = new LoginController(userService, tokenGenerator);

const router = Router();

router.post('/login', async (req, res, next) => {
  return userController.login(req, res, next);
})

router.post('/register',async (req, res, next) => {
  return userController.register(req, res, next);
})

export default router;