const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan')
const RateLimit = require('express-rate-limit');

// ---------------- Start -------------------- //
const apiLimiter = new RateLimit({
    windowMs: 1000 * 30,
    max: 10,
    handler: function (req, res) {
        res.json({
            status: 429,
            devMSG: 'Too Many Request',
            userMSG: "تعداد زیادی درخواست از سمت شما ارسال شده لطفا چند دقیقه دیگه دوباره امتحان کنید"
        })
    }
});
// ----------------- END --------------------- //


// -------------- Start Of Main Classs------------------ //
module.exports = class Application {
    constructor() {

        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setRouters();
    }

    // ---------------- Start -------------------- //
    setupExpress() {
        const server = http.createServer(app);
        server.listen(process.env.PORT, (err) => {
            if (err) {
                console.error('Server   =>  Error \n\n' + err)
            }
            else {
                console.info('Server   => Ready')
            }
        });
    }
    // ----------------- END --------------------- //

    // ---------------- Start -------------------- //
    setMongoConnection() {
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        }, (err) => {
            if (err) {
                console.error('DataBase => Error \n\n' + err)
            }
            else {
                console.info('DataBase => Ready')
            }
        });
    }
    // ----------------- END --------------------- //


    /**
     * Express Config
     */
    // ---------------- Start -------------------- //
    setConfig() {
        app.enable('trust proxy');
        app.use(helmet());
        app.use(express.static('public'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(morgan('tiny'))

        /**
         * if you need to redirect http request to https , then remove comments
        
            app.use((req, res) => {
                if (req.secure) {
                    next()
                }
                else {
                    res.redirect('https://' + req.headers.host + req.url)
                }
            })

         */
    }
    // ----------------- END --------------------- //


    // ---------------- Start -------------------- //
    setRouters() {
        app.use(apiLimiter, require('./routes'));
    }
    // ----------------- END --------------------- //
}

// -------------- End Of Main Classs------------------ //