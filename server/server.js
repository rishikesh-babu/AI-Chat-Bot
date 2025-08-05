const express = require('express');
const app = express();
const port = 3000;

app.listen(port, (err) => {
    if (!err) {
        console.log('Server is running at port: ', port);
    } else {
        console.log('err :>> ', err);
    }
});