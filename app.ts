import express, {Application, Request, Response, NextFunction} from 'express';
import joi, {ValidationResult} from "joi";
import {PlanetModel} from "./model/planet.model";
import Joi from "joi";

const app: Application = express()

app.use(express.json())


interface IPlanetArray {
    id: number;
    name: string;
    mass: number;
    satellitesAmount: number;
}

let planets: IPlanetArray[] =
    [
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

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, go to the /api for discovering what APIs here. Created by Nikita Petrenko. 2021.')
})

app.get('/api', (req: Request, res: Response) => {
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
    })
})

app.get('/api/planets', (req: Request, res: Response) => {
    res.json(planets);
})

app.get('/api/planets/:id', (req: Request, res: Response) => {
    const planet = planets.find(planet => planet.id === parseInt(req.params.id))
    if (!planet) res.status(404).send('No planet with such id')
    return res.json(planet)
})

app.post('/api/planets', (req: Request, res: Response) => {
    const {error} = validatePlanet(req.body)

    if (error) {
        res.status(400).send(error.message)
        return
    }

    const planet: IPlanetArray = {
        id: planets.length + 1,
        name: req.body.name,
        mass: req.body.mass,
        satellitesAmount: req.body.satellitesAmount
    }

    planets.push(planet)
    return res.json(planets)
})

app.get('/secretMessage', (req:Request, res:Response) => {
    return res.send('Loovee Liiizoooochkaaaaa')
})

app.put('/api/planets/:id', (req: Request, res: Response) => {

    const planet: IPlanetArray | undefined = planets.find(planet => planet.id === parseInt(req.params.id))

    if (planet) {
        const {error} = validatePlanet(req.body)

        if (error) {
            res.status(400).send(error.message)
            return
        }

        planet.name = req.body.name
        planet.mass = req.body.mass
        planet.satellitesAmount = req.body.satellitesAmount
        res.json(planet)
    } else {
        res.status(400).send('Not found')
        return
    }

})

app.delete('/api/planets/:id', (req: Request, res: Response) => {
    const planet: IPlanetArray | undefined = planets.find(planet => planet.id === parseInt(req.params.id))
    if (planet) {
        const index = planets.indexOf(planet)
        planets.splice(index, 1)
        return res.json(planet)
    } else {
        res.status(400).send('Not found')
        return
    }

})

function validatePlanet(planet: Request): ValidationResult {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        mass: Joi.number().positive().required(),
        satellitesAmount: Joi.number().positive().required()
    })
    return schema.validate(planet)
}

const port = process.env.PORT || 2120;
app.listen(port, () => console.log('the serv is running'));
