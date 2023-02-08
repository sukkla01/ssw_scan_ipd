module.exports = {
    HOST: "192.168.0.15",
    USER: "hos",
    PASSWORD: "sswhosxp2020",
    DB: "hosxp_imagedb",
    dialect: "postgres",
    port: '6432',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    secret :'1234'
  };