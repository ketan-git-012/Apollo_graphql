const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const configApp = require("./config/configurations");

class Server {
  constructor(express) {
    this.express = express;
    this.app = this.express();
    // this.app.listen(8000);
    this.config = configApp;
    this.PORT = this.config.server.PORT || 8000;
  }

  setUpApollo(options) {
    this.server = new ApolloServer({
      ...options,
    });

    this.app.use(cors());
    this.app.use(this.express.json());
    const { app } = this;
    this.server.applyMiddleware({ app });
  }

  async run() {
    const httpServer = http.createServer(this.app);

    this.server.installSubscriptionHandlers(httpServer);

    await new Promise((resolve) => httpServer.listen(this.PORT, resolve));
    console.log(
      `🚀 Server ready at http://localhost:${this.PORT}${this.server.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${this.PORT}${this.server.subscriptionsPath}`
    );
  }
}

module.exports = Server;
