import express, {Application, Request, Response, NextFunction} from 'express';

const app: Application = express()


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({
        "API": [
            {
                "/planets": "get all planets"

            },
            {
                "/planet/id": "get planet by id"
            },
            {
                "/planet/searchByName": "search planet by name[?name=searchParams]"
            },
            {
                "crud operations": "POST PUT DELETE"
            },
            {
                "message for Lizo4ka" : "Loooveee Liizoochka"
            }
        ]
    })
})

app.listen(2121, () => console.log('serv running'))
