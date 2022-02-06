const router = require('express').Router()


/** 
 * middlewares
 */
// ------------------------------------ //
/*            No MiddleWare            */
// ------------------------------------ //


/** 
 * admin routes
*/
// ------------------------------------ //
const public = require('./public')
router.use('/', public)
// ------------------------------------ //


/**
 * error handler
 */
// ---------------- Start -------------------- //
router.use((req, res) => {
    return res.status(404).json({
        status: 'NotFound',
        devMSG: 'NotFound',
        userMSG: 'یافت نشد'
    })
})

router.use((err, req, res, next) => {
    if (err.name === "MulterError") {
        return res.status(415).json({
            status: 400,
            devMSG: err.message,
            userMSG: "حجم فایل باید کم تر از 50 مگابایت باشد"
        })
    }
    else {
        return res.status(err.status || 400).json({
            status: err.status,
            devMSG: err.message,
            userMSG: err.userMSG
        })
    }
})
// ----------------- END --------------------- //


module.exports = router