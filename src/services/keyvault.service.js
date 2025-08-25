const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const {
  InvalidCloudCredentialsError,
  ErrorGettingSecret
} = require("../errors");

function getClient() {
  try{
    const vaultUrl = process.env.AZ_KV_URI;
    const credential = new DefaultAzureCredential();
    return new SecretClient(vaultUrl, credential);
  } catch (error) {
    console.log('Error getting client');
    throw new InvalidCloudCredentialsError(error)
  }
}

async function getSecret(secret_name) {
  const client = getClient();
  try{
    const secret = await client.getSecret(secret_name);
    return JSON.parse(secret.value);
  } catch (error) {
    console.log('Error getting secret');
    throw new ErrorGettingSecret(error)
  }
}

module.exports = {getSecret}