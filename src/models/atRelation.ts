import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './connection';

interface AtRelationAttributes {
  id: number;
  userId: number;
  blogId: number;
  isRead: boolean;
  isDelete: boolean;

  createdAt: Date;
  updatedAt: Date;
}

type AtRelationCreationAttributes = Optional<AtRelationAttributes, 'id' | 'isRead' | 'isDelete'>;

class AtRelation extends Model<AtRelationAttributes, AtRelationCreationAttributes>
  implements AtRelationAttributes {
  public id!: number;
  public userId!: number;
  public blogId!: number;
  public isRead!: boolean;
  public isDelete!: boolean;

  public createdAt!: Date;
  public updatedAt!: Date;
}

AtRelation.init(
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
      comment: 'AT用户的ID'
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'AT blog ID'
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: '是否已读'
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: '标识改at记录是否删除'
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: 'at_relation',
    modelName: 'atRelation'
  }
);

export default AtRelation;
