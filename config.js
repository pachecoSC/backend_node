module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.API_PORT || 0
  },
  post: {
    port: process.env.POST_PORT || 0
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'notasecret!'
  },
  mysql: {
    host: process.env.MYSQL_HOST ||'',
    user: process.env.MYSQL_USER || '',
    password: process.env.MYSQL_PASS || '',
    database: process.env.MYSQL_DB || 'db_node_test'
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || '',
    port: process.env.MYSQL_SRV_PORT || 0
  },
  cacheService: {
    host: process.env.CACHE_SRV_HOST || '',
    port: process.env.CACHE_SRV_PORT || 0
  }
}
