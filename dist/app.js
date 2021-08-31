"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
let planets = [
    {
        id: 0,
        name: "test",
        mass: 5e30,
        satellitesAmount: 33
    },
    {
        id: 1,
        name: "test2",
        mass: 5e30,
        satellitesAmount: 33
    }
];
app.get('/', (req, res) => {
    res.send('Hello, go to the /api for discovering what APIs here. Created by Nikita Petrenko. 2021.');
});
app.get('/api', (req, res) => {
    res.json({
        "API": [
            {
                "/planets": "get all planets"
            },
            {
                "/planet/id": "get planet by id"
            },
            {
                "crud operations[/planets, /planet/id, /planet/id]": "POST PUT DELETE"
            },
        ]
    });
});
app.get('/api/planets', (req, res) => {
    res.json(planets);
});
app.get('/api/planets/:id', (req, res) => {
    const planet = planets.find(planet => planet.id === parseInt(req.params.id));
    if (!planet)
        res.status(404).send('No planet with such id');
    return res.json(planet);
});
app.post('/api/planets', (req, res) => {
    const { error } = validatePlanet(req.body);
    if (error) {
        res.status(400).send(error.message);
        return;
    }
    const planet = {
        id: planets.length + 1,
        name: req.body.name,
        mass: req.body.mass,
        satellitesAmount: req.body.satellitesAmount
    };
    planets.push(planet);
    return res.json(planets);
});
app.get('/secretMessage', (req, res) => {
    return res.send('Loovee Liiizoooochkaaaaa');
});
app.put('/api/planets/:id', (req, res) => {
    const planet = planets.find(planet => planet.id === parseInt(req.params.id));
    if (planet) {
        const { error } = validatePlanet(req.body);
        if (error) {
            res.status(400).send(error.message);
            return;
        }
        planet.name = req.body.name;
        planet.mass = req.body.mass;
        planet.satellitesAmount = req.body.satellitesAmount;
        res.json(planet);
    }
    else {
        res.status(400).send('Not found');
        return;
    }
});
app.delete('/api/planets/:id', (req, res) => {
    const planet = planets.find(planet => planet.id === parseInt(req.params.id));
    if (planet) {
        const index = planets.indexOf(planet);
        planets.splice(index, 1);
        return res.json(planet);
    }
    else {
        res.status(400).send('Not found');
        return;
    }
});
function validatePlanet(planet) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).required(),
        mass: joi_1.default.number().positive().required(),
        satellitesAmount: joi_1.default.number().positive().required()
    });
    return schema.validate(planet);
}
const port = process.env.PORT || 2120;
app.listen(port, () => console.log('the serv is running'));
