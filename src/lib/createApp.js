import Express from 'express';
import YAML from 'yamljs';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { logger } from 'loggery';

import routes from '../routes';

async function createApp() {
  try {
    const app = new Express();
    const swaggerDocument = YAML.load('docs/swagger.yaml');

    /**
     * Register essential middleware
     * for express app
     */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    /**
     * Setup the documentation url.
     */
    app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    /**
     * Enable CORS
     */
    app.use(cors());
    /**
     * Register the routes
     */
    app.use('/v1', routes);

    return app;
  } catch (error) {
    logger().error(error);
    process.exit(1);
  }
}

export default createApp;
