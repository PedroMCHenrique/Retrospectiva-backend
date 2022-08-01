import { Request, Response } from "express";
import CablewayService from "../services/CablewayService";

class CablewayController {
  constructor(private cablewayService: CablewayService) {}

  async getAll(_req: Request, res: Response) {
    const cableways = await this.cablewayService.getAll();
    return res.status(200).json(cableways);
  }
}

export default CablewayController;