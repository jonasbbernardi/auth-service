const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require('@azure/keyvault-secrets');
require('dotenv').config();
const keyvaultService = require('../../src/services/keyvault.service');
const {
  InvalidCloudCredentialsError,
  ErrorGettingSecret
} = require("../../src/errors");


jest.mock('@azure/identity', () => {
  return {
    DefaultAzureCredential: jest.fn().mockImplementation(() => {
      return {
        getToken: jest.fn(() => Promise.resolve({ token: 'mock-token' })),
      };
    }),
  };
});

const successObj = {success: 'true'}

describe('KeyVault service', () => {
  beforeEach(() => {
    jest.spyOn(SecretClient.prototype, 'getSecret').mockRestore();
  })

  it('should return success object', async () => {
    jest.spyOn(SecretClient.prototype, 'getSecret').mockImplementation(async () => {
      return {value: JSON.stringify(successObj)};
    })
    const secret = await keyvaultService.getSecret('secret');
    expect(secret).toMatchObject(successObj);
  })

  it('should return error - empty credentials', async () => {
    jest.spyOn(DefaultAzureCredential.prototype, 'constructor').mockImplementation(() => {
      throw new Error();
    })
    const secret = keyvaultService.getSecret('secret');
    return expect(secret).rejects.toThrow(InvalidCloudCredentialsError);
  })

  it('should return error - empty credentials', async () => {
    jest.spyOn(DefaultAzureCredential.prototype, 'constructor').mockImplementation(() => {
      return {};
    })
    const secret = keyvaultService.getSecret('secret');
    return expect(secret).rejects.toThrow(ErrorGettingSecret);
  })
})