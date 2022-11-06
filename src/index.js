const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

// app.use((req, res, next) => {
// //   console.log(req.method, req.path)
// //   next()
//   res.status(503).send('Server in maintenace mode!')
// })

const multer = require('multer')
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)){
      return cb(new Error('Please upload a Word document'))
    }
    cb(undefined, true)
  }
})

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
}, (err, req, res, next) => {
  res.status(400).send({ error: err.message })
})

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})
