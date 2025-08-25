
const client_default = {
  client: 'client1',
  product: 'service1',
  secret: 'myPa$$word123',
  scopes: ['api1']
}
const scope_all = {
  ...client_default,
  scopes: ['*']
}

const client_without_secret = {
  client: 'client1',
  product: 'service1'
}
const invalid_secret = {
  client: 'client1',
  product: 'service1',
  secret: 'myPa$$word124',
  scopes: ["api1"]
}
const client_data_without_secret = {
  client: 'client2',
  product: 'service2',
  secret: 'myPa$$word123',
  scopes: ['api1']
}
const invalid_scope = {
  client: 'client1',
  product: 'service1',
  secret: 'myPa$$word123',
  scopes: ['api11']
}
const invalid_product = {
  client: 'client1',
  product: 'service2',
  secret: 'myPa$$word123',
  scopes: ["api1"]
}
const invalid_client = {
  client: 'client11',
  product: 'service1',
  secret: 'myPa$$word123',
  scopes: ["api1"]
}

module.exports = {
  client_default,
  scope_all,
  client_without_secret,
  invalid_secret,
  client_data_without_secret,
  invalid_scope,
  invalid_product,
  invalid_client,
}