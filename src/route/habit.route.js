// IMPORTING HabitController CLASS FROM habit.conroller.js FILE
import HabitController from "../controller/habit.conroller.js";
// CREATING AN INSTANCE OF HabitController
const habitController = new HabitController();
// IMPORTING EXPRESS MODULE
import express from "express";
// CREATING A NEW INSTANCE OF EXPRESS'S ROUTER
export const habitRouter = express.Router();

// SETTING UP ROUTES FOR DIFFERENT ENDPOINTS USING THE METHODS FROM HabitController

// ROUTE FOR HOME PAGE
habitRouter.get("/", habitController.getHomePage);

// ROUTE FOR GETTING HABIT LIST PAGE
habitRouter.get("/list", habitController.getHabitList);

// ROUTE FOR RECORD PAGE OF A SPECIFIC HABIT
habitRouter.get("/record/:id", habitController.getRecordPage);

// ROUTE FOR ADD HABIT PAGE
habitRouter.get("/add-habit", habitController.getAddHabitPage);

// ROUTE FOR CHANGING STATUS OF A HABIT
habitRouter.get("/change-status/:id", habitController.changeStatus);

// ROUTE FOR ADDING A NEW HABIT
habitRouter.post("/add-habit", habitController.addHabit);