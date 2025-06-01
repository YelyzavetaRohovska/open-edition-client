
import fetchMock from 'jest-fetch-mock';
import { Get, Post } from '../../http';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('httpRequest utility', () => {
  const baseOpt = {
    endpoint: 'https://api.example.com',
    token: 'fake-token',
  };

  it('should make a GET request successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'success' }));

    const result = await Get<{ message: string }>({
      ...baseOpt,
    });

    expect(fetchMock).toHaveBeenCalledWith('https://api.example.com', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer fake-token',
      },
      body: null,
    });

    expect(result).toEqual({ message: 'success' });
  });

  it('should make a POST request successfully with body', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ status: 'ok' }));

    const body = { name: 'John' };

    const result = await Post<{ status: string }, typeof body>(
      { ...baseOpt },
      body
    );

    expect(fetchMock).toHaveBeenCalledWith('https://api.example.com', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer fake-token',
      },
      body: JSON.stringify(body),
    });

    expect(result).toEqual({ status: 'ok' });
  });

  it('should throw an error if fetch fails', async () => {
    fetchMock.mockResponseOnce('fail', { status: 500 });

    await expect(
      Get<{ error: string }>({ ...baseOpt })
    ).rejects.toThrow('Request failed: 500');
  });
});
