const { isAsyncIterable } = require('@graphql-tools/utils');
const { PubSub } =require('apollo-server-express');

const psab = new PubSub();
import psb from './../pubsub';

const NEW_TRAINEE = 'NEW_TRAINEE'
const Subscription = {
    addTrainee : {
        subscribe : () => psb.asyncIterator(NEW_TRAINEE)
    },
    updateTrainee : {
        subscribe : () => psb.asyncIterator(NEW_TRAINEE)
    },
    deleteTrainee : {
        subscribe : ()  => psb.asyncIterator(NEW_TRAINEE)
    }
}

module.exports = {
    Subscription, NEW_TRAINEE
};