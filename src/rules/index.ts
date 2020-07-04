import { SchemaModel, StringType, NumberType } from 'schema-typed';

const loginModel = SchemaModel({
  username: StringType().isRequired('用户名不能为空'),
  email: StringType().isEmail('请输入正确的邮箱'),
  age: NumberType('年龄应该是一个数字').range(18, 30, '年龄应该在 18 到 30 岁之间')
});

const registModel = SchemaModel({
  userName: StringType()
    .isRequired('请填写用户名')
    .pattern(/^[a-zA-Z][a-zA-Z0-9_]+$/, '字母开头，字母数字下划线')
    .minLength(2, '用户名最少2个字符')
    .maxLength(100, '用户名最多100个字符'),
  password: StringType()
    .isRequired('请填写密码')
    .minLength(3, '密码最少3个字符')
    .maxLength(16, '密码最多16个字符'),
  newPassword: StringType()
    .isRequired('请输入二次确认密码')
    .minLength(3, '密码最少3个字符')
    .maxLength(16, '密码最多16个字符')
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }
      return true;
    }, '两次密码输入不一致'),
  nickName: StringType().maxLength(100, '昵称最多100个字符'),
  picture: StringType().maxLength(255, '图片链接最多255个字符'),
  city: StringType()
    .minLength(2, '城市最少2个字符')
    .maxLength(255, '城市最多255个字符'),
  gender: NumberType()
    .min(1, '性别职能输入1、2、3')
    .max(3, '性别职能输入1、2、3')
});

export default {
  loginModel,
  registModel
};
