import axios from '../../utils/axios';
import Blog from '../../models/blog';
import * as Types from '../../types';

const user = {
  userName: 'test_test',
  password: '111111'
};

let token = '';

test('获取 test_test 的token', async () => {
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

test('test getAtMeCount interface', async () => {
  const { data: response } = await axios.get<{
    flag: 0 | 1;
    data: number;
  }>('/api/atMe/getAtMeCount', {
    headers: {
      authorization: token
    }
  });

  expect(response.flag).toBe(1);
});

test('test atMe blog list', async () => {
  const { data: response } = await axios.get<{
    flag: 0 | 1;
    data: {
      totalCount: number;
      list: Blog[];
      pageIndex: number;
      pageSize: number;
    };
  }>('/api/atMe/loadMore/0', {
    headers: {
      authorization: token
    }
  });

  expect(response.flag).toBe(1);
});

test('test markAsReadByBlogId interface', async () => {
  const { data: response } = await axios.post<{
    flag: 0 | 1;
    code?: Types.EErrorResponseCode;
    msg?: Types.EErrorResponseMsg;
    data: {
      isRead: boolean;
    };
  }>(
    '/api/atMe/markAsReadByBlogId',
    {
      blogId: 25
    },
    {
      headers: {
        authorization: token
      }
    }
  );

  if (response.code === Types.EErrorResponseCode.HAS_MARKED_READ_ERROR_CODE) {
    expect(response.flag).toBe(0);
    expect(response.data.isRead).toBe(true);
  } else {
    expect(response.flag).toBe(1);
    expect(response.data.isRead).toBe(true);
  }
});

test.skip('test markAllAsRead interface', async () => {
  const { data: response } = await axios.get<{
    flag: 0 | 1;
    code?: Types.EErrorResponseCode;
    msg?: Types.EErrorResponseMsg;
    data: {
      isAllread: boolean;
    };
  }>('/api/atMe/markAllAsRead', {
    headers: {
      authorization: token
    }
  });

  if (response.code === Types.EErrorResponseCode.HAS_MARKED_READ_ERROR_CODE) {
    expect(response.flag).toBe(0);
    expect(response.data.isAllread).toBe(true);
  } else {
    expect(response.flag).toBe(1);
    expect(response.data.isAllread).toBe(true);
  }
});
