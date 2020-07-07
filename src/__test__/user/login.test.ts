import axios from '../../utils/axios';
import Helper from '../../utils/helper';

const user = {
  userName: 'test_test',
  password: '111111',
  gender: 1
};

test.skip('test login interface', async () => {
  const { data: response } = await axios.post<{
    flag: 0 | 1;
    data: {
      token: string;
    };
  }>('/api/user/login', user);

  expect(response.flag).toBe(1);
  expect(response.data.token).toBeTruthy();
  const token = Helper.decodeToken(response.data.token);
  console.log('token: ', token);
  expect(token.userName).toBe(user.userName);
  expect(token.gender).toBe(String(user.gender));
  expect(token.nickName).toBe(user.userName);
  expect(token.city).toBeNull();
});
