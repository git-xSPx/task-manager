require('../src/db/mongoose')

const User = require('../src/models/user')

// User.findByIdAndUpdate('62d2c6f3749f5693d885c464', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('62d2c6f3749f5693d885c464', 1).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})