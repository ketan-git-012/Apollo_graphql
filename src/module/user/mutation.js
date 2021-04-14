
const Mutation = {

  signUpUser : (root, args, context, info) =>{
    try{
        const user = context.dataSources.userAPI.signUpUser(args);
        return user;
    }
    catch(error){
      throw new Error(error.message);
    }
  },

  loginUser: (root, args, context, info) => {
    try {
      const user = context.dataSources.userAPI.loginUser(args);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

};

module.exports = Mutation;
