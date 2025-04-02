import http from 'node:http'

const server = http.createServer((req, res) => {
    const { method, url } = req
    console.log
    if (method === 'GET' && url === '/users') {
        return res.end('Listando Usuarios...')
    }
    
    if (method === 'POST' && url === '/users') {
        return res.end('Criando Usuario...') 
    }

    return res.end('Hello World')
})

server.listen({
    port:3333
})