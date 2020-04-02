const Table = require('cli-table');

/**
 * @description funcao que cria uma tabela com todos os endpoints da api
 * @param {string} baseUrl - BASEURL DA API
 * @param {object} routes  - objeto routes do express
 */
const printRoutes = (baseUrl, routes) => {
  const table = new Table({ head: ['Path', 'Method'] });
  console.log(`\nAPI for ${baseUrl}`);
  console.log('\n********************************************');
  for (const key of routes) {
    const o = {};
    o[key.method] = key.endpoint;
    table.push(o);
  }
  console.log(table.toString());
  return table;
};

module.exports = {
  printRoutes
}