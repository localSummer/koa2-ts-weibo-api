import axios from '../../utils/axios';
import { IUserInfo } from '../../types';

const user = {
  userName: 'test_test',
  password: '111111'
};

let token = '';

beforeAll(async () => {
  const { data: response } = await axios.post<{
    flag: 0 | 1;
    data: {
      token: string;
    };
  }>('/api/user/login', user);
  expect(response.flag).toBe(1);
  expect(response.data.token).toBeTruthy();
  token = response.data.token;
});

test('test getUserInfo interface', async () => {
  if (token) {
    const { data: response } = await axios.get<{
      flag: 0 | 1;
      data: IUserInfo;
    }>('/api/user/getUserInfo', {
      headers: {
        authorization: token
      }
    });
    expect(response.flag).toBe(1);
    expect(response.data.userName).toBe(user.userName);
    expect(response.data.gender).toBe('1');
  } else {
    throw new Error('token not exist');
  }
});
