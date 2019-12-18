import createApp from "./lib/createApp";
import {logger} from "loggery"

const PORT = 3000;

async function main() {
  try {
    const app = await createApp();

    await app.listen(PORT, async () => {
      logger().info(`Cv-builder api listening on port: http://localhost:${PORT}`);  
    });

    return app;
  } catch (error) {
    logger().error(error);
    process.exit(1);
  }
}

export default main();