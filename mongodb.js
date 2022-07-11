// CRUD (create, read, update, delete) 

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable connect to database!')
    }

    const db = client.db(databaseName)

    /*
    db.collection('users').findOne({ _id: new ObjectId('62caacc6f529f809ab458fc9') }, (error, user) => {
        if (error) {
            console.log('Unable to fetch!')
        }
        console.log(user)
    })
    */
    /*
    db.collection('users').find({ age: 25 }).toArray((error, users) => {
        console.log(users)
    })

    db.collection('users').find({ age: 25 }).count((error, count) => {
        console.log(count)
    })
    */
    db.collection('tasks').findOne({ _id: new ObjectId('62b4d7e1a8d51556e93ee301') }, (error, user) => {
        if (error) {
            console.log('Unable to fetch!')
        }
        console.log(user)
    })
    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        if (error) {
            console.log('Unable to fetch!')
        }
        console.log(tasks)
    })
})