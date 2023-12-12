// IMPORTING HABIT MODEL FROM THE HABIT SCHEMA FILE
import { HabitModel } from "./habit.schema.js";

// CLASS TO HANDLE HABIT MODEL OPERATIONS
export default class HabitModelClass {

    // FUNCTION TO RETRIEVE THE LIST OF HABITS
    async getHabitList() {
        try {
            // RETRIEVING ALL HABITS FROM THE DATABASE
            return await HabitModel.find();
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS 
            throw err;
        }
    }

    //  FUNCTION TO GET A SPECIFIC HABIT RECORD
    async getRecordPage(habitId) {
        try {
            // RETRIEVING A HABIT BY ITS UNIQUE ID
            return await HabitModel.findById(habitId);
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS 
            throw err;
        }
    }
    // FUNCTION TO CHANGE THE STATUS OF A HABIT FOR A PARTICULAR DAY
    async changeStatus(habitId, day) {
        try {
            // FINDING A HABIT BY ITS ID
            const habit = await HabitModel.findById(habitId);
            // CONDITIONAL CHECKS TO CHANGE HABIT STATUS BASED ON EXISTING STATUS
            if (habit.status[day] == "none") {
                //IF THE STATUS IS NONE SET IT AS NOT-DONE
                await HabitModel.findByIdAndUpdate(habitId, { $set: { [`status.${day}`]: "not-done" } }, { new: true });
            } else if (habit.status[day] == "not-done") {
                //IF THE STATUS IS NOT-DONE SET IT AS DONE 
                await HabitModel.findByIdAndUpdate(habitId, { $set: { [`status.${day}`]: "done" } }, { new: true });
            } else if (habit.status[day] == "done") {
                //IF THE STATUS IS DONE SET IT AS NONE AGAINE
                await HabitModel.findByIdAndUpdate(habitId, { $set: { [`status.${day}`]: "none" } }, { new: true });
            }
            return;
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS 
            throw err;
        }
    }


    // FUNCTION TO ADD A NEW HABIT
    async addHabit(obj) {
        try {
            // CHECKING IF THE HABIT ALREADY EXISTS IN THE DATABASE
            const exists = await HabitModel.findOne({ habit: obj.habit });
            if (!exists) {
                // IF HABIT DOESN'T EXIST, SETTING NONE STATUS AND SAVING NEW HABIT TO DATABASE
                obj.status = ["none", "none", "none", "none", "none", "none", "none"];
                const habit = new HabitModel(obj);
                await habit.save();
                return;
            } else {
                // IF HABIT ALREADY EXISTS, RETURNING ALL HABITS
                return await HabitModel.find();
            }
        } catch (err) {
            //HANDLING UNEXPECTED ERRORS 
            throw err;
        }
    }
}