import axios from '../../utils/axios';

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

test('test updateUserInfo interface', async () => {
  const { data: response } = await axios.patch<{
    flag: 0 | 1;
    data: null;
  }>(
    '/api/user/updateUserInfo',
    {
      nickName: 'test_nickName',
      picture: '/2020-07-05/1593963239705.jpg',
      city: '北京'
    },
    {
      headers: {
        authorization: token
      }
    }
  );
  expect(response.flag).toBe(1);
  expect(response.data).toBe(null);
});
