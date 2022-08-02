import CablewayModel from "../database/models/CablewayModel";
import HandleError from "../helpers/HandleError";
import { ICableway } from "../interfaces";

class CablewayService {
  async getAll(): Promise<ICableway[]> {
    const cableways = await CablewayModel.findAll();
    return cableways;
  }

  async getById(id: string): Promise<ICableway> {
    const cableways = await CablewayModel.findOne({ where: { id: id } });

    if (!cableways) {
      throw HandleError.notFound(`Cableway #${id} not found`)
    }

    return cableways;
  }
}

export default CablewayService;