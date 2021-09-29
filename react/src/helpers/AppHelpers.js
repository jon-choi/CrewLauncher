
const getClientId = (client, clientList) => {
  const { email } = client;
  const existingClient = clientList.filter(c => c.email === email);
  console.log("getClientId returns: ", existingClient.length > 0 ? existingClient[0].id : false );
  if (existingClient.length > 0) {
    return existingClient[0].id;
  } else {
    return false;
  }
};

export { getClientId }