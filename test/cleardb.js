import models from "../src/sequelize/models/index";
export default async function clearDatabase() {
  await models.sequelize.truncate();
  return;
}
