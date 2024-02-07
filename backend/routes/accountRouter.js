const express = require('express');
const router = express.Router();
const {Account, User} = require('../db')
const {authMiddleware} = require('../middleware')
const {default: mongoose} = require('mongoose');

router.get('/balance', authMiddleware, async (req,res) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account.balance
    })
})

// ==> Good Solution

router.post('/transfer', authMiddleware, async (req,res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount, to} = req.body;

    if(!amount || !to) {
        return res.status(400).json({
            message: "Invalid input"
        })
    }

    const account = await Account.findOne({
        userId: req.userId
    }).session(session)

    if(!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance / from account not valid"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session)

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid to account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session)

    await Account.updateOne({
        userId: to
    }, {
        $inc : {
            balance: amount
        }
    })

    session.commitTransaction();

    const fromAcc = await User.findOne({
        _id:req.userId
    })

    const toAcc = await User.findOne({
        _id:to
    })

    res.json({
        message: `Transaction of ${amount} done, from ${fromAcc.firstName+' '+fromAcc.lastName} to ${toAcc.firstName +' '+ toAcc.lastName }`
    })
})
















// ==> bad solution
// router.post("/transfer", authMiddleware, async (req, res) => {
//     const { amount, to } = req.body;

//     const account = await Account.findOne({
//         userId: req.userId
//     });

//     if (account.balance < amount) {
//         return res.status(400).json({
//             message: "Insufficient balance"
//         })
//     }

//     const toAccount = await Account.findOne({
//         userId: to
//     });

//     if (!toAccount) {
//         return res.status(400).json({
//             message: "Invalid account"
//         })
//     }

//     await Account.updateOne({
//         userId: req.userId
//     }, {
//         $inc: {
//             balance: -amount
//         }
//     })

//     await Account.updateOne({
//         userId: to
//     }, {
//         $inc: {
//             balance: amount
//         }
//     })

//     res.json({
//         message: "Transfer successful"
//     })
// });


module.exports = router;




