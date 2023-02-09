const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./Routers/userRouter');
const categoryRouter = require('./Routers/categorytRouter');
const formData = require('express-form-data');
const port = 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(formData.parse());



// async function main() {
//     await mongoose.connect("mongodb+srv://newsDB:4wB43VMzo3HWb9dC@cluster0.ywj83cw.mongodb.net/newsAgency?retryWrites=true&w=majority",)
//     console.log("mongoose connected please work");
// }

try {
    mongoose.set("strictQuery", false);
    main().catch(err => console.log(err));
    async function main() {
        await mongoose.connect("mongodb+srv://newsDB:4wB43VMzo3HWb9dC@cluster0.ywj83cw.mongodb.net/newsAgency?retryWrites=true&w=majority",)
        console.log("mongoose connected please work");
    }
} catch (err) {
    console.log(err);
}

app.use(userRouter);
app.use(categoryRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})