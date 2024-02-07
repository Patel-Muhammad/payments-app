const express = require('express');
const zod = require('zod');
const router = express.Router();
const {User, Account} = require('../db')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config');
const {authMiddleware} = require('../middleware')

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string()
})

router.post('/signup', async (req,res) => {
    const body = req.body;
    const {success} = signupSchema.safeParse(body);

    if(!success) {
        return res.json({
            message: "Signup schema not valid"
        })
    }

    const user = await User.findOne({
        username:body.username
    })


    if (user) {
        return res.json({
            message: 'Email already exist'
        })
    }

    const dbUser = await User.create(body);

    const uid = dbUser._id;

    await Account.create({
        userId: uid,
        balance: Math.round(50 + Math.random() * 1000)
    })

    if (dbUser) {
        const token = jwt.sign({
            userId: dbUser._id
        }, JWT_SECRET)
        return res.json({
            message: 'User successfully created',
            token: token
        })
    }
    else {
        return res.json({
            message: 'Unexpected error creating user'
        })
    }

})


router.post('/signin', async (req,res) => {
    const body = req.body;
    const {success} = signinSchema.safeParse(body);

    if (!success) {
        return res.json({
            message: 'Sign in schema not valid'
        })
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password
    })

    if(user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            message: 'Sign successfull',
            token: token
        })
    }else {
        res.json({
            message: 'User/password does not match'
        })
    }

    
})


router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || '';
    const token = req.headers.authorization;



        const decoded = jwt.decode(token);
        const userIdToSkip = decoded.userId;




    const users = await User.find({
        $or: [
            {
                firstName: {
                    "$regex": filter
                }
            },
            {
                lastName: {
                    "$regex": filter
                }
            }
        ]
    })


    res.json({
        otherUser: users
        .filter(user => user._id != userIdToSkip)
        .map( user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        })),
        thisUser: users
        .filter(user => user._id == userIdToSkip)
        .map(user => ({
            username: user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})

module.exports = router;