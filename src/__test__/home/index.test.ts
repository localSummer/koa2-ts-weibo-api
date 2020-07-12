import axios from '../../utils/axios';
import Blog from '../../models/blog';

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

test('获取关注人的blog 列表', async () => {
  const { data: response } = await axios.get<{
    flag: 0 | 1;
    data: {
      list: Blog[];
      totalCount: number;
      pageSize: number;
      pageIndex: number;
    };
  }>('/api/home/loadMore/0', {
    headers: {
      authorization: token
    }
  });

  expect(response.flag).toBe(1);
  expect(response.data.list.length > 0).toBe(true);
});
