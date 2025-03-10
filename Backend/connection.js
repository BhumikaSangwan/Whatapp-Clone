import mongoose from "mongoose";

//connection to database
async function userDB(url) {
   return mongoose.connect(url);
}

async function chatDB(url){
   return mongoose.connect(url);
}

async function chatListDB(url){
   return mongoose.connect(url);
}

export {userDB, chatDB, chatListDB};