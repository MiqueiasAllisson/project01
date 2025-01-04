import http from 'node:http';

import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';


// JSON - JavaScript Object Notation
//
//



const server = http.createServer(async (req, res) => {
    const {method, url} = req;

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)
      /*   console.log(extractQueryParams(routeParams.groups.query)) */
        const {query, ...params} = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        req.params = {}

       

        return route.handler(req, res)
    }

    console.log(route)



    return res.writeHead(404).end()
})

server.listen(3333)