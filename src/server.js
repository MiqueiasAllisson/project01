import http from 'node:http';

// JSON - JavaScript Object Notation

const users = []

const server = http.createServer((req, res) => {
    const {method, url} = req;
    if(method === 'GET' && url === '/users' ) {
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }
    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'Jonh Doe',
            email: "johndoe@example.com"
        })
        return res.end("Criação de usuários")
    }
       return res.end("Hello Worldd")
})

server.listen(3333)