const express =require("express")
const app =express();
require("dotenv").config();
require("./dbconn/connection")
const router =require("./router/route")
const cors= require("cors")
const port =process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(router)
app.use("/uploads",express.static("./uploads"))

app.listen(port,()=>{
    console.log(`server listening on port no:${port}`);
})