import  { response_500, response_200,response_201,response_404 } from '../utils/statuscodes.utils.js';
import prisma from '../config/db.config.js';

export async function getExercises(req, res) {
    try {
        const exercises = await prisma.exercise.findMany();
        response_200(res,"exercises fetched successfully" ,exercises);
    } catch (error) {
        response_500(res, "error fetching exercises: ",error);
    }
}

export async function getUserExercises(req, res) {
    try {
        const userExercises = await prisma.exercise.findMany({
            where: {
                userId: req.user.userId
            }
        });
        console.log(userExercises);
        response_200(res,"user exercises fetched successfully" ,userExercises);
    } catch (error) {
        response_500(res, "error fetching user exercises: ",error);
    }
}

export async function createExercise(req,res){
    try{
        if(!req.body.name || !req.body.bodyPart || !req.body.equipment || !req.body.description){
            response_404(res,"Please provide all the fields");
            return;
        }
        if(!req.user.userId){
            response_404(res,"Unauthorized");
            return;
        }
        const {name,equipment, bodyPart, description} = req.body;
        const exercise = await prisma.exercise.create({
            data: {
                name,
                bodyPart,
                equipment,
                description,
                userId: req.user.userId
            }
        });

        
        response_201(res,"exercise created successfully",exercise);
    }
    catch(error){
        response_500(res, "error creating exercise: ",error);
    }
}