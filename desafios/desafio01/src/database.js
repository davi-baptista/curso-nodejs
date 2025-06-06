import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8')
        .then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }
    
    select(table, search) {
        let data = this.#database[table] ?? []

        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }
        return data
    }

    insert(table, data) {
        if (this.#database[table]) {
            this.#database[table].push(data)
        }
        else {
            this.#database[table] = [data]
        }
        this.#persist()
    }

    update(table, id, data) {
        const index = this.#database[table].findIndex(row => {
            return row.id === id
        })

        const existing = this.#database[table][index]
        if (index > -1) {
            this.#database[table][index] = { 
                ...existing, 
                ...data,
                updated_at: new Date().toISOString(), 
            }
            this.#persist()
        }
    }   

    delete(table, id) {
        const index = this.#database[table].findIndex(row => {
            return row.id === id
        })
        
        if (index > -1) {
            this.#database[table].splice(index, 1)
            this.#persist()
        }
    }
}