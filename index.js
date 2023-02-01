const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./Router/userRoute');
const formData = require('express-form-data');

const port = 3000;


const app = express();
app.use(express.urlencoded({ extended: true}));

app.use(bodyParser.json());

app.use(formData.parse());

mongoose.set("strictQuery", false);

main().catch(err => console.log(err));



async function main() {
    await mongoose.connect("mongodb+srv://newsDB:4wB43VMzo3HWb9dC@cluster0.ywj83cw.mongodb.net/newsAgency?retryWrites=true&w=majority",)
    console.log("mongoose connected please work");

    // let user = new userModel({
    //     userName: "paglu",
    //     email: "envkt@example.com",
    //     password: "123456"
    // });

    // console.log(user);
    // user.save();
}

app.use(userRouter);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})