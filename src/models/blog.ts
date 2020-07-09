import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './connection';

interface BlogAttributes {
  id: number;
  content: string;
  image: string;
  isDelete: boolean;
  userId: number;

  createdAt: Date;
  updatedAt: Date;
}

type BlogCreationAttributes = Optional<BlogAttributes, 'id' | 'image' | 'isDelete'>;

class Blog extends Model<BlogAttributes, BlogCreationAttributes> implements BlogAttributes {
  public id!: number;
  public content!: string;
  public image!: string;
  public isDelete!: boolean;
  public userId!: number;

  public createdAt!: Date;
  public updatedAt!: Date;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '微博内容'
    },
    image: {
      type: DataTypes.STRING,
      comment: '图片地址'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '用户ID'
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: '标识该微博是否删除'
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: 'blog',
    modelName: 'Blog'
  }
);

export default Blog;
