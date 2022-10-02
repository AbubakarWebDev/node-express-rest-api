const Joi = require('joi');
const router = require('express').Router();

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

// For read all the users
router.get('/', (req, res) => {
    res.send(users);
});

// For read only specific user
router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        debug(`Error: ${error}`);
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
router.put('/:id', (req, res) => {
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
        debug(`Error of '/:id': ${error}`);
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
router.delete('/:id', (req, res) => {
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

module.exports = router;