// CRUD (create, read, update, delete) 

const { serializeWithBufferAndIndex } = require('bson')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable connect to database!')
    }

    const db = client.db(databaseName)
    /*
        db.collection('users').insertOne({
            name: 'Serhii',
            age: 41
        }, (error, result) => {
    
            if (error) {
                return console.log('Unable to insert user!')
            }
    
            console.log(result)
    
        })
    */
    /*
        db.collection('users').insertMany([
            {
                name: 'Jen',
                age: 21
            },
            {
                name: 'Gunther',
                age: 28
            }], (error, result) => {
    
                if (error) {
                    return console.log('Unable to insert users!')
                }
    
                console.log(result)
    
            })
    */

    db.collection('tasks').insertMany([
        { description: 'Write code', completed: true },
        { description: 'Run the code', completed: false },
        { description: 'Check result', completed: false }],
        (error, result) => {
            if (error) {
                return console.log('Unable to insert tasks!')
            }

            console.log(result.insertedIds)
        })
})