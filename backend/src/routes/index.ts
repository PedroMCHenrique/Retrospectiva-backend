import { Router } from 'express';
import LoginController from '../controllers/UserController';
import UserService from '../services/UserService';
import TicketService from '../services/ticketService';
import TokenGenerator from '../helpers/TokenGenerator';
import LoginValidator from '../validators/LoginValidator';
import CablewayController from '../controllers/CablewayController';
import CablewayService from '../services/CablewayService';
import UserValidator from '../validators/UserValidator';
import TicketController from '../controllers/TicketController';
import Jwt from '../middlewares/jwt';

const loginValidator = new LoginValidator();
const userValidator = new UserValidator();
const tokenGenerator = new TokenGenerator();
const cablewayService = new CablewayService();
const cablewayController = new CablewayController(cablewayService);
const userService = new UserService(loginValidator, userValidator);
const ticketService = new TicketService();
const userController = new LoginController(userService, tokenGenerator);
const ticketController = new TicketController(ticketService);
const jwt = new Jwt();

const router = Router();

router.post('/login', async (req, res, next) => {
  return userController.login(req, res, next);
});

router.post('/register', async (req, res, next) => {
  return userController.register(req, res, next);
});

router.post('/buyticket/:id', jwt.validate, async (req, res, next) => {
  return ticketController.buy(req, res, next);
});

router.get('/cableway/:id', async (req, res, next) => {
  return cablewayController.getById(req, res, next);
})

router.get('/cableway', async (req, res,) => {
  console.log('sim');
  
  return cablewayController.getAll(req, res);
})

export default router;