const router = require('express').Router()

/**
 * controllers
 */
// ------------------------------------ //
/*            No Controller            */
// ------------------------------------ //

/**
  middlewares
 */
// ------------------------------------ //
/*            No MiddleWare            */
// ------------------------------------ //


router.use('/', (req, res, next) => {
    res.json({
        status: 200,
        devMSG: 'This Means Server Is Working So Hard Just For You',
        userMSG: "همه چی امن امانه"
    })
})



module.exports = router