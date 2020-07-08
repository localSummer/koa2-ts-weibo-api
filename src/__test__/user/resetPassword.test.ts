import axios from '../../utils/axios';
import * as Types from '../../types';

const user = {
  userName: 'test_1594201677377',
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

test('test resetPwd interface', async () => {
  const { data: response } = await axios.patch(
    '/api/user/resetPassword',
    {
      oldPassword: user.password,
      password: '222222',
      newPassword: '222222'
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

test('test getUserInfo interface', async () => {
  try {
    await axios.get<{
      flag: 0 | 1;
      code: Types.EErrorResponseCode.UN_AUTHORIZED_CODE;
      msg: Types.EErrorResponseMsg.UN_AUTHORIZED;
      data: null;
    }>('/api/user/getUserInfo', {
      headers: {
        authorization: token
      }
    });
  } catch ({ response }) {
    expect(response.status).toBe(401);
    expect(response.data.flag).toBe(0);
    expect(response.data.code).toBe(Types.EErrorResponseCode.UN_AUTHORIZED_CODE);
    expect(response.data.data).toBe(null);
    expect(response.data.msg).toBe(Types.EErrorResponseMsg.UN_AUTHORIZED);
  }
});

test('test login interface', async () => {
  const { data: response } = await axios.post<{
    flag: 0 | 1;
    data: {
      token: string;
    };
  }>('/api/user/login', {
    userName: user.userName,
    password: '222222'
  });

  expect(response.flag).toBe(1);
  expect(response.data.token).toBeTruthy();
});
