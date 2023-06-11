const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoute = require("./Routes/userRoute")


require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/users" , userRoute);

app.get("/" , (req,res) => {
    res.send("Welcome to chat API");
});
 
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI || 5000;

app.listen(port , (req , res) => {
    console.log(`Server running on port: ${port}`)
})

mongoose.connect(uri , {
    useNewUrlParser : true ,
    useUnifiedTopology : true,
}).then(() => {
    console.log("MongoDB connection established")
}).catch((error) => {
    console.log("MongoDB connection failed " + error.message);
})