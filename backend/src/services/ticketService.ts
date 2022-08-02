import Cableway from "../database/models/CablewayModel";
import CablewayUser from "../database/models/cablewayUserModel";
import HandleError from "../helpers/HandleError";
import { BuyTicket, ITicketService } from "../interfaces";

class TicketService implements ITicketService {
  async buy({cablewayId, userId, quantity}: BuyTicket) {
    const cableway = await Cableway.findByPk(cablewayId);
    if (!cableway) throw HandleError.notFound('"cableway" not found');
    if (cableway.seats < quantity) throw HandleError.badRequest('invalid "quantity"');
    const newQuantity = cableway.seats - quantity;
    await Cableway.update({ seats: newQuantity }, { where: { id: cablewayId } });
    await CablewayUser.create({ cablewayId, userId, quantity });
    return {
      message: `You bought ${quantity} tickets`
    };
  }
}

export default TicketService;