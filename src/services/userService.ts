import Models from '../models';

interface ICreateUserParams {
  userName: string;
  password: string;
  gender: number;
  nickName?: string;
  picture?: string;
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

  static async deleteUser(userName: string) {
    const result = await Models.User.update(
      {
        isDelete: true
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

export default UserService;
