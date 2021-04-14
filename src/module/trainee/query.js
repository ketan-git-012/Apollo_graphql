const {trainee} = require('./../../service/user');
const Mutation = require('./mutation');
const {Subscription } =  require('./subscriptions');
const Query = {
    getAllTrainees : (root, args, context, info) => {
        if(context.user == undefined){
            console.log("context.user:", context.user);
            throw new Error('unauthorized user');
          }
        try{
            const trainees = context.dataSources.traineeAPI.getAllTrainee();
            return trainees;
        }
        catch(ex){
            return { error : ex}
        }
    },
    getTraineeById : (root, args, context, info) => {
        if(context.user == undefined){
            console.log("context.user:", context.user);
            throw new Error('unauthorized user');
          }
        try{
            const trainee = context.dataSources.traineeAPI.getTraineeById(args);
            return trainee;
        }
        catch(ex){
            return { error : ex}
        }
    }
}

const traineeResolver = {
    Query,
    Mutation,
    Subscription
}

module.exports = traineeResolver;