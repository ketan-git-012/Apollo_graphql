import Mutation from './mutation';

const Query = {
    getMyProfile : ()=> ({
        id : 101,
        name : 'ketan',
        email : 'abc@aa.com'
    }),

    test :()=> 'this is test query!',



  getMe : (root, args, context, info) => {
      if(context.user == undefined){
        console.log("context.user:", context.user);
        throw new Error('unauthorized user');
      }
    try{
     const user = context.dataSources.userAPI.getMe();
     return user;
    }
    catch(err){
        return {user : undefined}

    }
 }
}

const userResolver = {
    Query,
    Mutation
}
module.exports = userResolver;