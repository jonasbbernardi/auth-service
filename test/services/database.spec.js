const service = require('../../src/services/database.service');
const {collection} = require('../../src/services/client.service');
const {
  DatabaseConnectError,
  DatabaseNotFoundError,
  CollectionNotReachableError
} = require('../../src/errors');
require('dotenv').config();
const {getSecret} = require('./mock-keyvault');

jest.mock('../../src/services/keyvault.service', () => {
  const {getSecret} = require('./mock-keyvault');
  return {
    __esModule: false,
    getSecret: jest.fn(getSecret)
  }
});

describe('Database service', () => {

  afterEach(() => {
    const keyvaultService = require('../../src/services/keyvault.service');
    keyvaultService.getSecret.mockImplementation(getSecret);
  })

  it('should return success', async () => {
    const data = await service.get('select * from c', collection);
    expect(data).toEqual(expect.any(Array));
  })

  it('should return database connect error', async () => {
    const keyvaultService = require('../../src/services/keyvault.service');

    keyvaultService.getSecret.mockImplementation(async (secretName) => {
      const secret = await getSecret(secretName);
      return {
        ...secret,
        ENDPOINT: null,
      }
    });
    return expect(service.get('select * from c', collection)).rejects.toThrow(DatabaseConnectError);
  })

  it('should return database not found error', async () => {
    const keyvaultService = require('../../src/services/keyvault.service');

    keyvaultService.getSecret.mockImplementation(async (secretName) => {
      const secret = await getSecret(secretName);
      return {
        ...secret,
        CONNECTION_KEY: null,
      }
    });
    return expect(service.get('select * from c', collection)).rejects.toThrow(DatabaseNotFoundError);
  })

  it('should return collection not reachable error', async () => {
    const {Database} = require('@azure/cosmos');
    jest.spyOn(Database.prototype, 'container').mockImplementation(() => {
      throw Error();
    });
    return expect(service.get('select * from c', collection)).rejects.toThrow(CollectionNotReachableError);
  })
})