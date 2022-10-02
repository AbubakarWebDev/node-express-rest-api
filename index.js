const Joi = require('joi');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const debug = require('debug')('app:startup');

const app = express();
const port = process.env.PORT || 3000;

// Using different middlewares in out application.
// for secure express app by setting various HTTP headers.
app.use(helmet());  

// for parsing requests body to JSON Object.
app.use(express.json());  

// for parsing requests form data to JSON Object.
app.use(express.urlencoded({ extended: true })); 

// for HTTP request logger.
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug("morgan works...");
}

// mock list of users 
let users = [
    { id: 1, name: 'Abubakar', age: 21},
    { id: 2, name: 'Samar', age: 20},
    { id: 3, name: 'Hamza', age: 19},
];

// utility function for validate the user
function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        age: Joi.number().integer().max(120).required(),
    });

    return schema.validate(user);
}

// For landing page
app.get('/', (req, res) => {
    res.send('Node Express Simple Rest Api');
});

// For read all the users
app.get('/api/users', (req, res) => {
    res.send(users);
});

// For read only specific user
app.get('/api/users/:id', (req, res) => {
    const user = users.find(elem => elem.id == req.params.id);

    if (!user) {
        res.status(404).send({
            code: 404,
            message: "The User with the given ID is not exist!"
        });
        return;
    }

    res.send(user);
});

// For Add new users
app.post('/api/users', (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        debug(`Error of '/api/users': ${error}`);
        res.status(400).send({
            code: 400,
            message: error.details.map(elem => elem.message),
        });
        return;
    }

    const user = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age,
    };
    users.push(user);

    res.send(user);
});

// For update existing user
app.put('/api/users/:id', (req, res) => {
    const user = users.find(elem => elem.id == req.params.id);
    if (!user) {
        res.status(404).send({
            code: 404,
            message: "The User with the given ID is not exist!"
        });
        return;
    }

    const { error } = validateUser(req.body);
    if (error) {
        debug(`Error of '/api/users/:id': ${error}`);
        res.status(400).send({
            code: 400,
            message: error.details.map(elem => elem.message),
        });
        return;
    }

    user.name = req.body.name;
    user.age = req.body.age;

    res.send(user);
});

// For delete existing user
app.delete('/api/users/:id', (req, res) => {
    const user = users.find(elem => elem.id == req.params.id);
    if (!user) {
        res.status(404).send({
            code: 404,
            message: "The User with the given ID is not exist!"
        });
        return;
    }

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user);
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});