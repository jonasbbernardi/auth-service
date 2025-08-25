const {
  InvalidCredentialsError,
  InvalidProductError,
  InvalidScopeError,
  InvalidClientDataError,
} = require("../errors");
const db = require('./database.service');

const collection = 'client';

function validateClientKey(clients, client_key) {
  const data = clients.filter(c => client_key == c.client_key);
  if(data.length <= 0) throw new InvalidCredentialsError();
  return data;
}

function validateProduct(clients, product) {
  const data = clients.filter(c =>
    c.client_data.products.includes(product));
  if(data.length <= 0) throw new InvalidProductError();
  return data;
}

function validateScope(clients, scopes) {
  const data = clients.filter(c => {
    if(!scopes) return true;
    for(const scope of scopes) {
      if (scope == '*') continue;
      if (c.scopes.includes(scope)) continue;
      return false;
    }
    return true;
  });
  if(data.length <= 0) throw new InvalidScopeError();

  return data;
}

async function getData(client_key, product, scopes) {
  const data = await db.get('select * from c', collection);

  const clients1 = validateClientKey(data, client_key);
  const clients2 = validateProduct(clients1, product);
  const clients3 = validateScope(clients2, scopes);
  return clients3[0];
}

async function validate(client_data) {
  try {
    const data = await db.get('select * from c', collection);
    const clients = validateClientKey(data, client_data.name);
    validateProduct(clients, client_data.product);
  } catch (error) {
    console.log('Invalid client data',error);
    throw new InvalidClientDataError();
  }

  return {
    client: client_data.name,
    product: client_data.product
  }
}

module.exports = {
  collection,
  getData,
  validate
};
