const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const apiRouter = require('./routes');
const port = 3000;

dotenv.config();

// app.use(cors({
//     origin: process.env.CLIENT_DOMAIN,  // Frontend URL
//     credentials: true // Allow cookies and authorization headers
// }));

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (!err) {
        console.log('Server is running at port: ', port);
    } else {
        console.log('err :>> ', err);
    }
});

app.use((req, res, next) => {
    console.log('\nreq.method :>> ', req.method);
    console.log('req.path :>> ', req.path);
    next()
})

// Test api
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World'})
})

// Main router
app.use('/api', apiRouter);

// Error handling 
app.use((err, req, res, next) => {
    if (err) {
        console.log('err.message :>> ', err.message);
        return res.status(err.statusCode || 500).json({ message: err.message || 'Internal server error' })
    }
})

app.all(/.*/, (req, res) => {
    res.status(404).json({ message: 'End point does not exist' });
});