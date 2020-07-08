import axios from '../../utils/axios';

const user = {
  userName: 'test_1594105690475',
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

test('test delete user interface', async () => {
  const { data: response } = await axios.post<{
    flag: 0 | 1;
    data: null;
  }>('/api/user/delete', user, {
    headers: {
      authorization: token
    }
  });
  expect(response.flag).toBe(1);
  expect(response.data).toBe(null);
});
