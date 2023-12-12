// IMPORTING MONGOOSE LIBRARY FOR DATABASE MANAGEMENT
import mongoose from "mongoose";
// DEFINING THE SCHEMA FOR HABIT MODEL
const habitSchema = new mongoose.Schema({
    // FIELD TO STORE THE HABIT NAME AS A STRING
    habit: String,
    // FIELD TO STORE NOTES RELATED TO THE HABIT AS A STRING
    note: String,
    // FIELD TO STORE STATUS OF THE HABIT FOR EACH DAY OF THE WEEK IN AN ARRAY
    status: ["none", "none", "none", "none", "none", "none", "none"]
});
// CREATING A MONGOOSE MODEL BASED ON THE SCHEMA
export const HabitModel = mongoose.model('Habit', habitSchema);