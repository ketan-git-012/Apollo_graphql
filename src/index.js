const express = require('express');
const options = require('./module');
const Server = require('./server');

const ApolloServer = new Server(express);
ApolloServer.setUpApollo(options);
ApolloServer.run();