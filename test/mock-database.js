const data = [{
  id: "1",
  client_key: "client1",
  secret_key: "$2b$10$1oDjHNkMWpx/0TPBhzJtAegyzpfw5ivxz8TukspOC9902bfbKIbKa",
  client_data: {
      name: "client1",
      acronym: "cli1",
      products: ["service1", "service3"],
      domains: ["*.domain1.com", "*.sub.domain1.com"]
  },
  scopes: ["api1"],
},{
  id: "2",
  client_key: "client2",
  client_data: {
      name: "client2",
      acronym: "cli2",
      products: ["service2"],
      domains: ["*.domain2.com"]
  },
  scopes: ["api1"],
}]

module.exports = {data};