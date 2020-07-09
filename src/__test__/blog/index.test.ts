import axios from '../../utils/axios';
import * as Types from '../../types';

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

describe.skip('create blog', () => {
  test('test create blog interface without image', async () => {
    const { data: response } = await axios.post<{
      flag: 0 | 1;
      data: null;
    }>(
      '/api/blog/create',
      {
        content: 'hello world-1'
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

  test('test create blog interface with image', async () => {
    const { data: response } = await axios.post<{
      flag: 0 | 1;
      data: null;
    }>(
      '/api/blog/create',
      {
        content: 'hello world-2',
        image: '/2020-07-05/1593963239705.jpg'
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

  test('test create blog interface without content', async () => {
    const { data: response } = await axios.post<{
      flag: 0 | 1;
      code: Types.EErrorResponseCode;
      data: null;
    }>(
      '/api/blog/create',
      {
        image: '/2020-07-05/1593963239705.jpg'
      },
      {
        headers: {
          authorization: token
        }
      }
    );

    expect(response.flag).toBe(0);
    expect(response.code).toBe(Types.EErrorResponseCode.INVALID_PARAMS_CODE);
  });
});

describe('get profile info', () => {
  test('test getProfileUserInfo interface', async () => {
    const { data: response } = await axios.get<{
      flag: 0 | 1;
      data: {
        userInfo: any;
        isSelf: boolean;
      };
    }>('/api/profile/test_test', {
      headers: {
        authorization: token
      }
    });

    expect(response.flag).toBe(1);
    expect(response.data.isSelf).toBe(true);
    expect(response.data.userInfo).toBeTruthy();
  });

  test('test getProfileBlogList interface', async () => {
    const { data: response } = await axios.get<{
      flag: 0 | 1;
      data: {
        totalCount: number;
        blogList: any;
        pageSize: number;
        pageIndex: number;
      };
    }>('/api/profile/loadMore/test_test/0', {
      headers: {
        authorization: token
      }
    });
    expect(response.flag).toBe(1);
    expect(response.data.blogList.length).toBeGreaterThan(0);
  });
});
