async function getSecret() {
  return {
    CONNECTION_KEY: 'MySecretKey==',
    CONNECTION_STR: 'AccountEndpoint=https://my-cosmos-server.documents.azure.com:443/;AccountKey=MySecretKey==;',
    ENDPOINT: 'https://my-cosmos-server.documents.azure.com:443/'
  }
}
module.exports = {getSecret};