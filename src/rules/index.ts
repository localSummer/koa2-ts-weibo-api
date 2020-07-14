import { SchemaModel, StringType, NumberType } from 'schema-typed';

const user = SchemaModel({
  userName: StringType()
    .isRequired('请填写用户名')
    .pattern(/^[a-zA-Z][a-zA-Z0-9_]+$/, '字母开头，字母数字下划线')
    .minLength(2, '用户名最少2个字符')
    .maxLength(100, '用户名最多100个字符')
});

const oldPassword = SchemaModel({
  oldPassword: StringType()
    .isRequired('请填写原密码')
    .minLength(3, '密码最少3个字符')
    .maxLength(16, '密码最多16个字符')
});

const password = SchemaModel({
  password: StringType()
    .isRequired('请填写密码')
    .minLength(3, '密码最少3个字符')
    .maxLength(16, '密码最多16个字符')
});

const updateUser = SchemaModel({
  nickName: StringType().maxLength(100, '昵称最多100个字符'),
  picture: StringType().maxLength(255, '图片链接最多255个字符'),
  city: StringType()
    .minLength(2, '城市最少2个字符')
    .maxLength(255, '城市最多255个字符')
});

const newPassword = SchemaModel({
  newPassword: StringType()
    .isRequired('请输入二次确认密码')
    .minLength(3, '密码最少3个字符')
    .maxLength(16, '密码最多16个字符')
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }
      return true;
    }, '两次密码输入不一致')
});

const gender = SchemaModel({
  gender: NumberType()
    .min(1, '性别只能输入1、2、3')
    .max(3, '性别只能输入1、2、3')
});

const blogModel = SchemaModel({
  content: StringType()
    .isRequired('请填写内容')
    .minLength(1, '最少输入一个字符')
    .maxLength(500, '最多输入500字符'),
  image: StringType()
    .maxLength(255, '图片链接最长不能超过255个字符')
    .pattern(/\.(jpg|png|gif|webp)$/i, '图片只支持jpg、png、gif、webp格式文件')
});

const userIdModel = SchemaModel({
  userId: NumberType().isRequired('用户ID不能为空')
});

const blogIdModel = SchemaModel({
  blogId: NumberType().isRequired('blog ID不能为空')
});

const followerIdModel = SchemaModel({
  followerId: NumberType().isRequired('关注的用户ID不能为空')
});

export default {
  userModel: user,
  registModel: SchemaModel.combine(user, password, newPassword, updateUser, gender),
  loginModel: SchemaModel.combine(user, password),
  updateUserModel: updateUser,
  resetPwdModel: SchemaModel.combine(oldPassword, password, newPassword),
  blogModel,
  userIdModel,
  followerIdModel,
  blogIdModel
};
