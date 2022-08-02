import { Response, NextFunction } from 'express';
import { RequestUser, ITicketService } from '../interfaces';

class TicketController {
  constructor(private ticketService: ITicketService) {
    this.ticketService = ticketService;
  }
  async buy(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;
      const { quantity } = req.body;
      const SCHEMA = {
        cablewayId: Number(id),
        userId: Number(userId),
        quantity,
      }
      const cableway = await this.ticketService.buy(SCHEMA);
      res.status(200).json(cableway);
    } catch (error) {
      next(error)
    }
  }
}

export default TicketController;