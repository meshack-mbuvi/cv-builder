require("dotenv").config();

module.exports = {
  development: {
    use_env_variable: "DATABASE_DEV_URL",
    dialect: "postgres",
    define: {
      timestamps: true
    }
  },
  test: {
    use_env_variable: "DATABASE_TEST_URL",
    dialect: "postgres",
    define: {
      timestamps: true
    },
    logging: false
  },
  production: {
    use_env_variable: "DATABASE_PROD_URL",
    dialect: "postgres",
    define: {
      timestamps: true
    },
    logging: false
  }
};
