const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const apiRouter = require('./routes');
const port = 3000;

dotenv.config();

app.use(cors({
    origin: process.env.CLIENT_DOMAIN,  // Frontend URL
    credentials: true // Allow cookies and authorization headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log('req.method :>> ', req.method);
    console.log('req.url :>> ', req.url);
})

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World'})
})

app.use('api', apiRouter);

app.listen(port, (err) => {
    if (!err) {
        console.log('Server is running at port: ', port);
    } else {
        console.log('err :>> ', err);
    }
});