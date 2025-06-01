import fetchMock from 'jest-fetch-mock';
import { UserService } from '../../../OEClient/Users';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('UserService', () => {
  const baseUrl = 'https://api.example.com';
  const token = 'fake-token';
  const userService = new UserService({ baseUrl, token });

  it('should fetch user list', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        userRecords: [{ id: '1', name: 'John Doe' }],
        numRecords: 1,
      })
    );

    const users = await userService.getUserList();

    expect(fetchMock).toHaveBeenCalledWith(
      `${baseUrl}/api/functions/User/List`,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: `Bearer ${token}`,
        }),
      })
    );

    expect(users).toEqual([{ id: '1', name: 'John Doe' }]);
  });

  it('should fetch user by id', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ user: { id: '2', name: 'Jane Smith' } })
    );

    const user = await userService.getUserById('2');
    expect(user).toEqual({ id: '2', name: 'Jane Smith' });
  });

  it('should throw if user is not found', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ user: null }));

    await expect(userService.getUserById('999')).rejects.toThrow('User is not found');
  });
});
