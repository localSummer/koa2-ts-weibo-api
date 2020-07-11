import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './connection';

interface FollowAttributes {
  id: number;
  userId: number;
  followerId: number;

  createdAt: Date;
  updatedAt: Date;
}

type FollowCreationAttributes = Optional<FollowAttributes, 'id'>;

class Follow extends Model<FollowAttributes, FollowCreationAttributes> implements FollowAttributes {
  public id!: number;
  public userId!: number;
  public followerId!: number;

  public createdAt!: Date;
  public updatedAt!: Date;
}

Follow.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '用户ID'
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '关注用户的ID'
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: 'follow',
    modelName: 'follow'
  }
);

export default Follow;
