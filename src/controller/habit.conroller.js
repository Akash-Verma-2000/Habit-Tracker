// IMPORTING HABIT MODEL CLASS TO HANDLE HABIT-RELATED OPERATIONS
import HabitModelClass from "../model/habit.model.js";
// CREATING AN INSTANCE OF HABIT MODEL CLASS
const habitModelClass = new HabitModelClass();
// EXPORTING HABIT CONTROLLER CLASS
export default class HabitController {
    // HANDLING GET REQUEST FOR HOME PAGE
    getHomePage(req, res) {
        return res.status(200).render('home-page');
    }
    //  FUNCTION TO GET THE LIST OF HABITS
    async getHabitList(req, res) {
        try {
            // RETRIEVING HABIT ARRAY USING HABIT MODEL CLASS METHOD
            const habitArray = await habitModelClass.getHabitList();
            // RENDERING HABIT LIST PAGE WITH HABIT ARRAY
            return res.status(200).render('habit-list-page', { exists: "", habitArray });
        } catch (err) {
            // HANDLING ERROR WHEN GETTING HABIT LIST
            return res.status(500).render('error');
        }
    }

    //FUNCTION TO GET RECORD PAGE OF A SPECIFIC HABIT
    async getRecordPage(req, res) {
        try {
            // GETTING HABIT ID FROM REQUEST PARAMS
            const habitId = req.params.id;
            // RETRIEVING HABIT OBJECT USING HABIT ID
            const habitObj = await habitModelClass.getRecordPage(habitId);
            // RENDERING RECORD PAGE WITH HABIT OBJECT
            return res.status(200).render('record-page', { habitObj });
        } catch (err) {
            // HANDLING ERROR WHEN GETTING RECORD PAGE
            return res.status(500).render('error');
        }
    }

    // HANDLING GET REQUEST FOR ADD HABIT PAGE
    getAddHabitPage(req, res) {
        return res.status(200).render('add-habit-page');
    }

    //FUNCTION TO ADD A NEW HABIT
    async addHabit(req, res) {
        try {
            // ADDING A NEW HABIT USING HABIT MODEL CLASS METHOD
            const newHabit = await habitModelClass.addHabit(req.body);
            if (newHabit) {
                // RENDERING HABIT LIST PAGE WITH ERROR MESSAGE IF HABIT ALREADY EXISTS
                return res.status(409).render('habit-list-page', { exists: "Habit Already Present", habitArray: newHabit });
            } else {
                // REDIRECTING TO HABIT LIST PAGE IF HABIT ADDED SUCCESSFULLY
                return res.status(201).redirect("/list");
            }
        } catch (err) {
            // HANDLING ERROR WHEN ADDING HABIT
            return res.status(500).render('error');
        }
    }

    //FUNCTION TO CHANGE STATUS OF A HABIT FOR A SPECIFIC DAY
    async changeStatus(req, res) {
        try {
            // GETTING HABIT ID AND DAY FROM REQUEST PARAMETERS
            const habitId = req.params.id;
            const day = req.query.day;
            // CHANGING HABIT STATUS FOR THE SPECIFIC DAY USING HABIT MODEL CLASS METHOD
            await habitModelClass.changeStatus(habitId, day);
            // REDIRECTING TO RECORD PAGE AFTER CHANGING STATUS
            return res.status(201).redirect(`/record/${habitId}`);
        } catch (err) {
            // HANDLING ERROR WHEN CHANGING HABIT STATUS
            return res.status(500).render('error');
        }
    }
}