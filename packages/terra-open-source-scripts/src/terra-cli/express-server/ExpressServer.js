const fs = require('fs-extra');
const express = require('express');
const Logger = require('@cerner/terra-cli/lib/utils/Logger');

const logger = new Logger({ prefix: '[terra-open-source-scripts:express-server]' });

class ExpressServer {
  constructor(options = {}) {
    const { host, port, site } = options;

    this.host = host;
    this.port = port;
    this.site = site;
  }

  /**
   * Creates an express app.
   * @returns {Object} - An instance of an express app.
   */
  createApp() {
    const app = express();

    app.use(express.static(this.site, { extensions: ['html', 'htm'] }));

    app.use([/\/[^.]*$/, '/*.html?'], (_req, res, next) => {
      // Return 404.html if provided.
      res.status(404).sendFile('/404.html', { root: this.site }, () => {
        // If there is an error, bail.
        next();
      });
    });

    return app;
  }

  /**
   * Starts the webpack dev server.
   * @returns {Promise} - A promise that resolves when the server has started.
   */
  async start() {
    // Check if the site exists prior to starting the express server.
    if (!await fs.pathExists(this.site) || ((await fs.lstat(this.site)).isDirectory() && (await fs.readdir(this.site)).length === 0)) {
      logger.error(`Cannot serve content from ${this.site} because it does not exist or it is empty.`);
      throw new Error();
    }

    await new Promise((resolve, reject) => {
      const app = this.createApp();

      logger.info('Starting the express server.');

      this.server = app.listen(this.port, this.host, (error) => {
        if (error) {
          reject(error);
        } else {
          logger.info(`Express server has started listening at ${`http://${this.host}:${this.port}/`}.`);
          resolve();
        }
      });
    });
  }

  /**
   * Stops the express server.
   * @returns {Promise} - A promise that resolves when the server has been stopped.
   */
  async stop() {
    logger.info('Closing the express server.');

    // Resolve immediately if the server is not available.
    if (!this.server) {
      return;
    }

    await new Promise((resolve) => {
      this.server.close(() => {
        this.server = null;
        resolve();
      });
    });
  }
}

module.exports = ExpressServer;
