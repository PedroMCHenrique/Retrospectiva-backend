import { Model, DataTypes } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class CablewayUser extends Model {
  public cablewayId!: number;
  public userId!: number;
  public quantity!: number;
}

CablewayUser.init({
  cablewayId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  tableName: 'cableway_users',
});

export default CablewayUser;
