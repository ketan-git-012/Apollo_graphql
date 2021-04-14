const { fileLoader, mergeTypes } = require('merge-graphql-schemas');
const userResolver = require('./user/query');
const traineeResolver = require('./trainee/query');
const path = require('path');
const { merge } = require('lodash');
const jwt = require('jsonwebtoken');

const option = {
  expiresIn: '1h',
  issuer: 'issuer'
};

import traineeAPI from '../datasource/Trainee';
import userAPI from '../datasource/User';
import psb from './pubsub';



const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'));
const typeDefs = mergeTypes(typesArray, {all : true});
const getUser = (token) => {
  try {
      // var checkToken = jwt.verify(token, "SECRET_KEY", option);
      // console.log("checkToken : ",checkToken);
      // console.log("token outisde if:", token);
    if(token) {  
      // console.log("token inside if:", token);
      return token;
    }
    return null
  } catch (error) {
    return null
  }
}
const resolvers = {
    userResolver,traineeResolver
}
const options = {
    typeDefs,
    resolvers: merge(resolvers.userResolver, resolvers.traineeResolver),
    dataSources: () => {
        return {
          userAPI: new userAPI,
          traineeAPI : new traineeAPI
        };
      },
    // context: ({ req, res }) => ({ req, res, psb }),
    context : ({ req }) => {
      // console.log("authrozation token:", req.headers.authorization);
      const token = req.headers.authorization || ''
      const SECRET = "SECRET_KEY"
      const option = {
        expiresIn: '1h',
        issuer: 'issuer'
      };
      if(token){
        const user = jwt.verify(token.split(' ')[1], SECRET, option)
        if(user){
          console.log(user);
          return {user : user}
        }
        else{
          console.log('authentication token is not proper please change it');
          return {user : 'authentication token is not proper please change it'}
        }
      }
        else{
        return {user : null}
      }
    }
}

module.exports = options;