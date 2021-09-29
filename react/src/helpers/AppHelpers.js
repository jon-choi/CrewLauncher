const getClientId = (client, clientList) => {
  const { email } = client;
  const existingClient = clientList.filter(c => c.email === email);
  if (existingClient.length > 0) {
    return existingClient[0].id;
  } else {
    return false;
  }
};

export { getClientId }