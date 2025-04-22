const express = require("express");

const app = express();

const PORT = 7070;

app.use((req,res)=>{
    res.send("Hello welco also")
})

app.listen(PORT,()=>{
    console.log(`Server is up and running on PORT: ${PORT}`)
})


