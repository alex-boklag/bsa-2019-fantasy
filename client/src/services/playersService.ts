import callWebApi from 'helpers/webApiHelper';

export const getPlayers = async (filter: any) => {
  const response = await callWebApi({
    endpoint: `/api/players`,
    type: 'GET',
    query: filter,
  });
  return response.json();
};

export const getPlayerById = async (id: string) => {
  const response = await callWebApi({
    endpoint: `/api/players/${id}`,
    type: 'GET',
  });
  return response.json();
};