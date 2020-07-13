import Models from '../models';
import { Op } from 'sequelize';

interface ICreateUserParams {
  userName: string;
  password: string;
  gender: number;
  nickName?: string;
  picture?: string;
}

interface IUpdateUserParams {
  nickName?: string;
  picture?: string;
  city?: string;
  updatedAt?: Date;
}

class UserService {
  static async getUserInfo(userName: string, password?: string) {
    const where = {
      userName
    };
    if (password) {
      Object.assign(where, {
        password
      });
    }

    const result = await Models.User.findOne({
      attributes: ['id', 'userName', 'nickName', 'picture', 'city', 'gender'],
      where
    });

    return result;
  }

  static async createUser({ userName, password, gender, nickName, picture }: ICreateUserParams) {
    const date = new Date();
    return await Models.User.create({
      userName,
      password,
      nickName: nickName ? nickName : userName,
      gender,
      picture: picture ? picture : '/2020-07-04/1593850667585.jpg',
      createdAt: date,
      updatedAt: date
    });
  }

  static async deleteUser(userName: string, isRealDel = false) {
    if (isRealDel) {
      const result = await Models.User.destroy({
        where: {
          userName
        }
      });
      return result === 1;
    } else {
      const result = await Models.User.update(
        {
          isDelete: true,
          updatedAt: new Date()
        },
        {
          where: {
            userName
          }
        }
      );
      return result[0] === 1;
    }
  }

  static async updateUser(userName: string, { nickName, picture, city }: IUpdateUserParams) {
    const updateData = {
      updatedAt: new Date()
    } as IUpdateUserParams;
    if (nickName) {
      updateData.nickName = nickName;
    }
    if (picture) {
      updateData.picture = picture;
    }
    if (city) {
      updateData.city = city;
    }
    const result = await Models.User.update(updateData, {
      where: {
        userName
      }
    });
    return result[0] === 1;
  }

  static async resetPassword(userName: string, oldPassword: string, password: string) {
    const result = await Models.User.update(
      {
        password,
        updatedAt: new Date()
      },
      {
        where: {
          userName,
          password: oldPassword
        }
      }
    );
    return result[0] === 1;
  }

  static async getUserIdsByUsernames(userNames: string[]) {
    return Models.User.findAll({
      attributes: ['id'],
      where: {
        userName: {
          [Op.in]: userNames
        }
      }
    });
  }
}

export default UserService;
