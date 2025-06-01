import fetchMock from 'jest-fetch-mock';
import { OEClient } from '../../OEClient/OEClient';

fetchMock.enableMocks();

describe('OEClient', () => {
  const host = 'https://api.example.com';
  const port = 443;
  const token = 'test-token';

  let client: OEClient;

  beforeEach(() => {
    fetchMock.resetMocks();
    client = new OEClient({ host, port, token });
  });

  it('should fetch user list', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        userRecords: [{ id: '1', name: 'John' }],
        numRecords: 1,
      })
    );

    const result = await client.getUserList();
    expect(result).toEqual([{ id: '1', name: 'John' }]);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com:443/api/functions/User/List',
      expect.objectContaining({
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
    );
  });

  it('should fetch user by ID', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ user: { id: '2', name: 'Jane' } })
    );

    const result = await client.getUserById('2');
    expect(result).toEqual({ id: '2', name: 'Jane' });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com:443/api/functions/User/Get',
      expect.objectContaining({
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: '2' }),
      })
    );
  });

  it('should throw an error if user is not found', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ user: null }));

    await expect(client.getUserById('999')).rejects.toThrow('User is not found');
  });
});
