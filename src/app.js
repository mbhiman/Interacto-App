const express = require('express');
const app = express();

app.use("/get-profile", (req, res) =>{
    res.send("Hello world to the profile after nodemon");
})

app.listen(3000, () => {
    console.log("yes");
})