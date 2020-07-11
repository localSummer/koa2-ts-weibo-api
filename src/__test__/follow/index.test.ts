import axios from '../../utils/axios';
import User from '../../models/user';

const user = {
  userName: 'test_test',
  password: '111111'
};

const user2 = {
  userName: 'wangxingwen',
  password: '111111'
};

let token1 = '';
let token2 = '';

test('获取 test_test 的token', async () => {
  const { data: response } = await axios.post<{
    flag: 0 | 1;
    data: {
      token: string;
    };
  }>('/api/user/login', user);
  expect(response.flag).toBe(1);
  expect(response.data.token).toBeTruthy();
  token1 = response.data.token;
});

test('follow wangxingwen id=12', async () => {
  const { data: response } = await axios.post<{
    flag: 0 | 1;
    data: null;
  }>(
    '/api/follow/addFollow',
    {
      followerId: 12
    },
    {
      headers: {
        authorization: token1
      }
    }
  );

  expect(response.flag).toBe(1);
  expect(response.data).toBe(null);
});

test('get test_test followers 1', async () => {
  const { data: response } = await axios.post<{
    flag: 0 | 1;
    data: {
      followers: User[];
      totalCount: number;
    };
  }>(
    '/api/follow/getFollowers',
    {
      userId: 2
    },
    {
      headers: {
        authorization: token1
      }
    }
  );

  expect(response.flag).toBe(1);
  expect(response.data.totalCount).toBeGreaterThan(0);
  expect(response.data.followers.length > 0).toBe(true);
  expect(response.data.followers[0].id).toBe(12);
});

test('test_test unfollow wangxingwen id=12', async () => {
  const { data: response } = await axios.post<{
    flag: 0 | 1;
    data: null;
  }>(
    '/api/follow/deleteFollow',
    {
      followerId: 12
    },
    {
      headers: {
        authorization: token1
      }
    }
  );

  expect(response.flag).toBe(1);
  expect(response.data).toBe(null);
});

test('get test_test followers 2', async () => {
  const { data: response } = await axios.post<{
    flag: 0 | 1;
    data: {
      followers: User[];
      totalCount: number;
    };
  }>(
    '/api/follow/getFollowers',
    {
      userId: 2
    },
    {
      headers: {
        authorization: token1
      }
    }
  );

  expect(response.flag).toBe(1);
  expect(response.data.totalCount).toBe(0);
  expect(response.data.followers.length).toBe(0);
});

test('获取 wangxingwen 的token', async () => {
  const { data: response } = await axios.post<{
    flag: 0 | 1;
    data: {
      token: string;
    };
  }>('/api/user/login', user2);
  expect(response.flag).toBe(1);
  expect(response.data.token).toBeTruthy();
  token2 = response.data.token;
});

test('wangxingwen follow test_test id=2', async () => {
  const { data: response } = await axios.post<{
    flag: 0 | 1;
    data: null;
  }>(
    '/api/follow/addFollow',
    {
      followerId: 2
    },
    {
      headers: {
        authorization: token2
      }
    }
  );

  expect(response.flag).toBe(1);
  expect(response.data).toBe(null);
});

test('get test_test fans', async () => {
  const { data: response } = await axios.post<{
    flag: 0 | 1;
    data: {
      fans: User[];
      totalCount: number;
    };
  }>(
    '/api/follow/getFans',
    {
      followerId: 2
    },
    {
      headers: {
        authorization: token1
      }
    }
  );

  expect(response.flag).toBe(1);
  expect(response.data.totalCount).toBeGreaterThan(0);
  expect(response.data.fans.length > 0).toBe(true);
  expect(response.data.fans[0].id).toBe(12);
});

test('wangxingwen unfollow test_test id=2', async () => {
  const { data: response } = await axios.post<{
    flag: 0 | 1;
    data: null;
  }>(
    '/api/follow/deleteFollow',
    {
      followerId: 2
    },
    {
      headers: {
        authorization: token2
      }
    }
  );

  expect(response.flag).toBe(1);
  expect(response.data).toBe(null);
});

test('get test_test fans 2', async () => {
  const { data: response } = await axios.post<{
    flag: 0 | 1;
    data: {
      fans: User[];
      totalCount: number;
    };
  }>(
    '/api/follow/getFans',
    {
      followerId: 2
    },
    {
      headers: {
        authorization: token1
      }
    }
  );

  expect(response.flag).toBe(1);
  expect(response.data.totalCount).toBe(0);
  expect(response.data.fans.length).toBe(0);
});
