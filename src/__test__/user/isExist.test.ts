import axios from '../../utils/axios';

const user = {
  userName: 'test_test'
};

test.skip('判断用户名是否存在', async () => {
  const { data: response } = await axios.post<{
    flag: number;
    data: {
      id: number;
      userName: string;
    };
  }>('/api/user/isExist', user);

  expect(response.flag).toBe(1);
  expect(response.data.id).toBeTruthy();
  expect(response.data.userName).toBe(user.userName);
});
