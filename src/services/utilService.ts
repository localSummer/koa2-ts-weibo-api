import Models from '../models';

class UtilService {
  static async updateAvator(userName: string, path: string) {
    const result = await Models.User.update(
      {
        picture: path,
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

export default UtilService;
