const { DatabaseConnectError, DatabaseNotFoundError, CollectionNotReachableError } = require('../errors');
const keyvaultService = require('./keyvault.service');
const loggerService = require('./logger.service');
const { CosmosClient } = require('@azure/cosmos');

async function connect() {
  try{
    const secret_name = process.env.AZ_KVS_COSMOS_DB
    const cosmos_data = await keyvaultService.getSecret(secret_name);
    const endpoint = cosmos_data.ENDPOINT;
    const key = cosmos_data.CONNECTION_KEY;
    return new CosmosClient({endpoint, key});
  } catch (error) {
    loggerService.error(error);
    throw new DatabaseConnectError()
  }
}

async function getDatabase() {
  const client = await connect();
  try {
    const dbname = process.env.COSMOS_DB_NAME;
    await client.databases.createIfNotExists({id: dbname});
    return client.database(dbname);
  } catch (error) {
    loggerService.error(error);
    throw new DatabaseNotFoundError();
  }
}

async function getCollection(collection) {
  const db = await getDatabase();
  try {
    await db.containers.createIfNotExists({id: collection});
    return db.container(collection);
  } catch (error) {
    throw new CollectionNotReachableError();
  }
}

async function get(query, collection) {
  const container = await getCollection(collection);
  const items = await container.items
                  .query(query).fetchAll();
  return items.resources;
}

module.exports = { get }