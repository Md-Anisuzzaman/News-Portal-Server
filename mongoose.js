const mongoose = require('mongoose');


mongoose.set("strictQuery", false);

main().catch(err => console.log(err));



async function main() {
    await mongoose.connect("mongodb+srv://newsDB:4wB43VMzo3HWb9dC@cluster0.ywj83cw.mongodb.net/newsAgency?retryWrites=true&w=majority",)
    console.log("mongoose connected");

    let user = new userModel({
        userName: "paglu",
        email: "envkt@example.com",
        password: "123456"
    });

    console.log(user);
    user.save();
}


//  4wB43VMzo3HWb9dC

//3rSBaSdULWhd31DD //newUser