import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './connection';

interface UserAttributes {
  id: number;
  userName: string;
  password: string;
  nickName: string;
  gender: number;
  picture: string;
  city: string;
  isDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'picture' | 'city' | 'isDelete'>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public userName!: string;
  public password!: string;
  public nickName!: string;
  public gender!: number;
  public picture!: string;
  public city!: string;
  public isDelete!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '用户名，唯一'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '密码'
    },
    nickName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '昵称'
    },
    gender: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 3,
      comment: '性别（1 男，2 女，3 保密）'
    },
    picture: {
      type: DataTypes.STRING,
      comment: '头像，存放图片地址'
    },
    city: {
      type: DataTypes.STRING,
      comment: '城市'
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: '标识该用户是否删除'
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: 'user',
    modelName: 'User'
  }
);

export default User;
