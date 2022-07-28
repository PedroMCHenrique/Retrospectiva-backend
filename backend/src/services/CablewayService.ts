import CablewayModel from "../database/models/CablewayModel";
import { ICableway } from "../interfaces";

class CablewayService {
  async getAll(): Promise<ICableway[]> {
    const cableways = await CablewayModel.findAll();
    return cableways;
  }
  
}

export default CablewayService;