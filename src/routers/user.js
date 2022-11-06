const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')

const { sendWelcomeEmail, sendGoodbyeEmail } = require('../emails/account')

const { isValidOperation } = require('../tools/common')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
 
    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })

    try {
        await user.save()
        
        sendWelcomeEmail(user.email, user.name)
        
        const token = await user.generateAuthToken()

        res.status(201).send({ user, token })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        
        res.send({ user, token })

    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        
        req.user.tokens = req.user.tokens.filter((tokensItem) => {
            return tokensItem.token !== req.token
        })
        
        await req.user.save()
        
        res.send()

    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        
        req.user.tokens = []
        
        await req.user.save()
        
        res.send()

    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/users/me', auth, async (req, res) => {

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })

    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     res.status(500).send()
    // }

    res.send(req.user)

})

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     // User.findById(_id).then((user) => {
//     //     if (!user) {
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch((e) => {
//     //     res.status(404).send(e)
//     // })

//     try {
//         const user = await User.findById(_id)
//          if (!user) {
//             return res.status(404).send({ error: 'User not found!' })
//          }
//          res.send(user)
//     } catch (e) {
//         res.status(404).send(e)
//     }
// })

router.patch('/users/me', auth, async (req, res) => {
// router.patch('/users/:id', async (req, res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = [ 'name', 'email', 'password', 'age' ]
    // const isValidOperation = updates.every( (update) => allowedUpdates.includes(update) )

    try {
        
        if (!isValidOperation(updates, allowedUpdates)) {
            return res.status(400).send({ error: 'Invalid updates! Allowed keys: ' + allowedUpdates + '.' })
        }


        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // const user = await User.findById(req.params.id)
        // if (!user) {
        //     return res.status(404).send({ error: 'User not found!' })
        // }
        
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        res.send(req.user)

    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete('/users/me', auth, async (req, res) => {
// router.delete('/users/:id', async (req, res) => {

    try {
        
        // const user = await User.findByIdAndDelete(req.params.id)
        
        // if (!user) {
        //     return res.status(404).send({ error: 'User not found!' })
        // }
        await req.user.remove()
        sendGoodbyeEmail(req.user.email, req.user.name)
        res.send(req.user)

    } catch (e) {
        res.status(500).send(e)
    }
})

const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/i)){
            return cb(new Error('Please upload an image file (jpg|jpeg|png)!'))
        }
        
        cb(undefined, true)

    }
})
  
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
    
    req.user.avatar = buffer
    await req.user.save()
    
    res.send()
}, (err, req, res, next) => {
    res.status(400).send({ error: err.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    
    req.user.avatar = undefined
    await req.user.save()

    res.send()

})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)    

        if(!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    }
    catch(e) {
        res.status(404).send()
    }
})

module.exports = router
