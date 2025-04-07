export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users')
    
            return res.end(JSON.stringify(users))
        }
    }
]