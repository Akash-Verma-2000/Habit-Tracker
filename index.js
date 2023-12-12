//IMPORTING NECCESSARY MODULES AND MIDDLESWARES
import express from "express";
import ejsLayouts from 'express-ejs-layouts';
import path from "path";
import { connectToMongoose } from "./configurations/mongoose.config.js";
import { habitRouter } from "./src/route/habit.route.js";

//MAKING EXPRESS SERVER
const server = express();

//SETTING UP THE VIEW ENGINES 
server.set('view engine', 'ejs');

//SETTING UP THE DEFAULT VIEW DIRECTORY
server.set('views', path.join(path.resolve(), 'src', 'view', 'html'));

//SETTING UP THE EJS LAYOUTS 
server.use(ejsLayouts);

//SETTING UP STATIC FOLDER SO THAT STYLE, SCRIPTS AND OTHER FILE CAN BE ACCESSED BY THE SERVER
server.use(express.static('src/view'));

//SETTING FOR POST REQUEST SO THAT REQ.BODY OBJECT CAN BE READ PROPERLY
server.use(express.urlencoded({ extended: true }));

//HANDLING ALL THE REQUEST TO THIS ROUTE
server.use("/", habitRouter);

//LISTENIG TO THE SERVER ON POSRT 5100
server.listen("5100", () => {
    //CONNECTING MONGOOSE 
    connectToMongoose();
    console.log("Ther server is listenig on port 5100");
})