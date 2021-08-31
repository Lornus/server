"use strict";
/*
import {PlanetModel} from "../model/planet.model";
import {planets} from "../data/planets"
//import {v4 as uuid} from 'uuid'
import {Request, Response} from "express";

export class PlanetController {
    _planets: PlanetModel[];

    constructor() {
        this._planets = [];
    }

    get getPlanets(): PlanetModel[] {
        return this._planets;
    }

    incrementId(): number {
        let id = planets.length + 1
        return id
    }

   // postPlanets(name: string, mass: number, satellitesAmount: number) {
   //      const planet = new PlanetModel(this.incrementId(), name, mass, satellitesAmount);
   //      this._planets.push(planets);
   //      return planet;
    }


    findPlanetByName(name: string, req: Request, res: Response) {
        const planets: PlanetModel[] = this.getPlanets
        const planet = planets.find((planet => planet.name === req.params.name))
        //const planet = planets.find((item:PlanetModel) =>  (item.name ===  req.params.name))
        if (!planet) {
            res.status(404).send("No such planet")
        }
        return res.json(planets)
    }

//     putPlanet (req:PlanetModel,res:Response) {
//         if (!req.id ||) {
//             res.status(400).send({ATTENTION: 'Wrong id'})
//             return;
//         }
//     const planet = new PlanetModel(
//     this._planets.push(planet)
//     return planet
// })

}
*/
