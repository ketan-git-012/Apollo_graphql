import { RESTDataSource } from 'apollo-datasource-rest';
import { config } from 'dotenv';

config();

class traineeAPI extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = "http://localhost:8080/";
    }

    async addTrainee(args){
        console.log("trianee data in rersources:", args)
        const trainee = await this.post("/trainee/add", args);
        return trainee;
    }

    async getAllTrainee(){
        const trainee = await this.get("/trainee/getAll");
        return trainee;
    }

    async getTraineeById(args){
        const trainee = await this.get(`/trainee/${args.id}`);
        return trainee;
    }

    async updateTrainee(args){
        const trainee = await this.put(`/trainee/updateTrainee/${args._id}`, args);
        return trainee;
    }

    async deleteTrainee(args){
        const trainee = await this.delete(`/trainee/deleteTrainee/${args._id}`);
        return trainee;
    }
}

export default traineeAPI;