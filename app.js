const express = require('express');
const morgan = require('morgan');
const storyRoutes = require('./routes/storyRoutes');
const userRoutes = require('./routes/userRoutes');
const moongoose = require('mongoose');
const mainRoutes = require('./routes/mainRoutes');
const methodOverride = require('method-override');

const app = express();

let port = 3000;
app.set('view engine', 'ejs');
let host = 'localhost';
let url = 'mongodb://localhost:27017/NBAD';

// Connect to MongoDB
moongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.log('Could not connect to MongoDB');
        console.log(err);
    })

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.use('/', mainRoutes); // Use mainRoutes for general site navigation
app.use('/stories', storyRoutes); // Use storyRoutes for handling connections
app.use('/users', userRoutes); // Use userRoutes for handling user login

app.use((req, res, next) => {
    let err = new Error('The Server cannot locate '+ req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error")
    }
     res.status(err.status);
     res.render('error', {error:err});
});
