import axios from '../../utils/axios';

const user = {
  userName: 'test_1593922360600'
};

test('判断用户名是否存在', async () => {
  const { data: response } = await axios.post<{
    flag: number;
    data: any;
  }>('/api/user/isExist', user);

  expect(response.flag).toBe(1);
});
