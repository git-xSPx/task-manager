// CRUD (create, read, update, delete) 

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable connect to database!')
    }

    const db = client.db(databaseName)
    
    // create
    /*
    db.collection('users').insertOne({
        name: "Serhii",
        age: 25
    }).then((result) => {
        console.log(result.insertedId)
    }).catch((error) => {
        console.log(error)
    })
    */

    // read
    /*
    db.collection('users').findOne({ _id: new ObjectId('62caacc6f529f809ab458fc9') }, (error, user) => {
        if (error) {
            console.log('Unable to fetch!')
        }
        console.log(user)
    })
    
    
    db.collection('users').find({ age: 25 }).toArray((error, users) => {
        console.log(users)
    })

    db.collection('users').find({ age: 25 }).count((error, count) => {
        console.log(count)
    })
    
    
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
    */
    
    // update
    /*
    db.collection('users').updateOne(
        {
            _id : ObjectId("62cc8097886dd31939de60ae")
        },
        {
            $inc: { age: 3 }
        }
    ).then((result) => {
        console.log(result)
    }).catch ((error) => {
        console.log(error)
    })
    
    db.collection('tasks').updateMany(
        {
            completed : false
        },
        {
            $set: { completed : true }
        }
    ).then((result) => {
        console.log(result)
    }).catch ((error) => {
        console.log(error)
    })
    */

    //delete
    /*
    db.collection('users').deleteMany(
        {
            age : 28
        }
    ).then((result) => {
        console.log(result)
    }).catch ((error) => {
        console.log(error)
    })
    */
   db.collection('tasks').deleteOne({
        description: 'Check result'
   }).then((result) => {
        console.log(result)
   }).catch((error) => {
        console.log(error)
   })
   
})