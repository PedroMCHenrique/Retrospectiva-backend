import { DataTypes, Model } from 'sequelize';
import db from '.';
import { ICableway } from '../../interfaces';
import User from './UserModel';

class Cableway extends Model implements ICableway {
  public id!: number;
  public name!: string;
  public price!: number;
  public seats!: number;
  public departureTime!: string;
  public image!: string;
}

Cableway.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    seats: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    departureTime: {
      allowNull: false,
      unique: true,
      type: DataTypes.DATE,
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);

Cableway.hasMany(User, { foreignKey: 'id', as: 'user' });
User.hasMany(Cableway, { foreignKey: 'id', as: 'cabbleway' });

export default Cableway;