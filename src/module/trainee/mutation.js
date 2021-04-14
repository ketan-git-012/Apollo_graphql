const { Subscription , NEW_TRAINEE } = require('./subscriptions');

import psb from './../pubsub';

const Mutation = {
    createTrainee: (root, args, context, info)=>{
       
        // if(context.user == undefined){
        //     console.log("context.user:", context.user);
        //     throw new Error('unauthorized user');
        // }

        try{
            const trainee = context.dataSources.traineeAPI.addTrainee(args);

        psb.publish(NEW_TRAINEE, {
            addTrainee : {
                id : trainee,
                firstname : args.firstname,
                lastname : args.lastname,
                email : args.email
            }
        })
            return trainee;
        }
        catch(ex){
            return {error : ex}
        }
},


    updateTrainee : (root, args, context, info)=>{
        
        // const traineeData = trainee.get(args.traineeId);
        // console.log("get by id trainee:", traineeData);

        // if(!traineeData){
        //     return "could'nt find trianee with id ",args.traineeId;
        // }
        // if(args.firstname !== undefined){
        //     traineeData.firstname = args.firstname;
        // }
        // if(args.lastname !== undefined){
        //     traineeData.lastname = args.lastname;
        // }
        // if(args.email !== undefined){
        //     traineeData.email = args.email;
        // }
        // trainee.update(traineeData)

        try{
            const trainee = context.dataSources.traineeAPI.updateTrainee(args);
            psb.publish(NEW_TRAINEE, {
                updateTrainee : {
                    id : args._id,
                    firstname : args.firstname,
                    lastname : args.lastname,
                    email : args.email
                }
            })
            return trainee
        }
        catch(ex){
            return {error : ex}
        }

        
    },
    deleteTrainee : (root, args, context, info)=>{
        

        try{
            const trainee = context.dataSources.traineeAPI.deleteTrainee(args);
            psb.publish(NEW_TRAINEE, {
                deleteTrainee : {
                    id : args._id
                }
            })
            return trainee
        }
        catch(ex){
            return {error : ex}
        }        
    }
}

module.exports = Mutation;