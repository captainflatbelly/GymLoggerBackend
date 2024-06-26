import express from "express";
import {modifyWorkoutStatus,createWorkout, getWorkoutDates, getWorkouts, modifyExerciseStatus, getWorkoutByDate,getExerciseStatus, markPreviosWorkoutAsIncomplete, getWorkoutById} from "../../controllers/workout.controllers.js";
import { authVerify } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.route('/createWorkout').get(authVerify).post(createWorkout);
router.route('/getWorkoutDates').get(getWorkoutDates);
router.route('/modifyWorkoutStatus/:workoutId').patch(modifyWorkoutStatus);
router.route('/modifyExerciseStatus/:workoutId/:exerciseId').get(authVerify).patch(modifyExerciseStatus);
router.route('/getWorkouts').get(authVerify).get(getWorkouts);
router.route('/:date').get(getWorkoutByDate);
router.route('/markPreviousWorkoutsAsIncomplete').get(authVerify).patch(markPreviosWorkoutAsIncomplete);
router.route('/getWorkoutById/:workoutId').get(authVerify).get(getWorkoutById);
router.route('/getExerciseStatus/:workoutId/:exerciseId').get(authVerify).get(getExerciseStatus);
export default router;