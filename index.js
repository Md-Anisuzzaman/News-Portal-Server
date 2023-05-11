const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./Routers/userRouter');
const categoryRouter = require('./Routers/categorytRouter');
const newsRouter = require('./Routers/newsRouter');
const formData = require('express-form-data');
const dotenv = require('dotenv');
dotenv.config();

const port = 8000;
const app = express();
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(formData.parse());
app.use('/uploads', express.static('uploads'))

// async function main() {
//     await mongoose.connect("mongodb+srv://newsDB:4wB43VMzo3HWb9dC@cluster0.ywj83cw.mongodb.net/newsAgency?retryWrites=true&w=majority",)
//     console.log("mongoose connected please work");
// }

try {
    mongoose.set("strictQuery", false);
    main().catch(err => console.log(err));
    async function main() {
        await mongoose.connect(`mongodb+srv://newsDB:${process.env.MONGOO_DB}@cluster0.ywj83cw.mongodb.net/newsAgency?retryWrites=true&w=majority`)
        console.log("mongoose connected please work");
    }
} catch (err) {
    console.log(err);
}

app.use(userRouter);
app.use(categoryRouter);
app.use(newsRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})