import Helper from '../../utils/helper';
import axios from '../../utils/axios';

const user = {
  userName: `test_${Date.now()}`,
  password: '111111',
  newPassword: '111111',
  gender: 2
};

test('注册用户成功并返回token', async () => {
  const { data: response } = await axios.post<{
    flag: number;
    data: {
      token: string;
    };
  }>('/api/user/register', user);

  expect(response.flag).toBe(1);
  expect(response.data.token).toBeTruthy();
  const decodeToken = Helper.decodeToken(response.data.token);
  expect(decodeToken.id).toBeTruthy();
  expect(decodeToken.userName).toBe(user.userName);
});
