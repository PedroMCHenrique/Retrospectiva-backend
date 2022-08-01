import { Request, Response, NextFunction } from "express";
import CablewayService from "../services/CablewayService";

class CablewayController {
  constructor(private cablewayService: CablewayService) {}

  async getAll(_req: Request, res: Response) {
    const cableways = await this.cablewayService.getAll();
    return res.status(200).json(cableways);
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const cableway = await this.cablewayService.getById(id);
      res.status(200).json(cableway);
    } catch (error) {
      next(error)
    }
  }
}

export default CablewayController;