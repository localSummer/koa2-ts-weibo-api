import Models from '../models';

class AtRelationService {
  static async bulkCreateAtRelation(blogId: number, atUserIdList: number[]) {
    const date = new Date();
    const records = atUserIdList.map((userId) => ({
      userId,
      blogId,
      createdAt: date,
      updatedAt: date
    }));

    return await Models.AtRelation.bulkCreate(records);
  }

  static async createAtRelation(blogId: number, atUserId: number) {
    const date = new Date();
    return await Models.AtRelation.create({
      userId: atUserId,
      blogId,
      createdAt: date,
      updatedAt: date
    });
  }
}

export default AtRelationService;
