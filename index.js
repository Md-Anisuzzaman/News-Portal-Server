const express = require('express');

const app = express();



app.listen(process.env.PORT || 8000, () => {
    console.log("My server is runing on port 8000");

});