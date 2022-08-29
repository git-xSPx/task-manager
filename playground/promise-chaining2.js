require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete("62e2df6856d287cc307c1afe").then((deletedTask) => {
//     console.log(deletedTask)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed })
    return count
}

deleteTaskAndCount('62e2dd6fbc5397ad90e3b788', false).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})