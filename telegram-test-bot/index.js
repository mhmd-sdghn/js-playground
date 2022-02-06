require("dotenv").config();

const {Telegraf, Markup, Scenes, session} = require("telegraf");
const initDB = require("./inits/initDB");
const shortid = require("shortid");
const {TOKEN, SERVER_URL} = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webkook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const Chat = require("./models/Chat");
const Message = require("./models/Message");

const bot = new Telegraf(process.env.BOT_TOKEN);

/**
 * wellcome message
 */
bot.start(async (ctx) => {
    const current_chat = await ctx.getChat();
    let chat = await Chat.findOne({chat_id: current_chat.id}).exec();
    if (!chat)
        chat = await Chat.create({
            chat_id: current_chat.id,
            code: shortid.generate(),
            ...current_chat,
        });

    const text = ctx.message.text;

    if (text === "/start")
        ctx.reply(
            "خیلی خوش اومدی ، با استفاده از دستور /getMyLink میتونی لینک پیام ناشناس خودت رو دریافت کنی"
        );
    else {
        const code = text.replace("/start ", "");
        const c = await Chat.findOne({code});

        if (!c) return ctx.reply("لینک معتبر نیست");

        if (c.chat_id === chat.chat_id)
            return ctx.reply("میخوای به خودت پیام ناشناس بدی ؟");

        const m = await Message.findOne({from: ctx.message.chat.id, to: c.chat_id});

        if (!m) {
            await Message.create({from: ctx.message.chat.id, to: c.chat_id});
        }

        ctx.reply(
            `در حال ارسال پیام به ${c.first_name} هستی ، پیامتو بنویس`,
            Markup.forceReply().placeholder("متن پیام")
        );
    }
});

/**
 * help message
 */
bot.help((ctx) =>
    ctx.reply("برای دریافت لینک پیام ناشناس روی تنها گزینه ی منو کلیک کن")
);

bot.on("callback_query", async (ctx) => {
    //console.log(ctx.update);
    let target = ctx.update.callback_query.data

    if (target.includes('answer')) {
        target = target.replace('answer ', '');
        await Message.create(({from: ctx.update.callback_query.from.id, to: target, isReply: true}))
        ctx.reply(
            `پاسخ خودت رو بنویس`,
            Markup.forceReply().placeholder("متن")
        );
    }

});

bot.hears('/getMyLink', (ctx) => {
    ctx.reply('عضویت توسط ادمین موقتا بسته شده است')
})

/**
 * send username
 */
bot.on("text", async (ctx) => {
    const chat = ctx.message.chat;
    const target = ctx.message.text;

    if (ctx.message.reply_to_message) {
        const m = await Message.findOne({from: chat.id, message: null});
        if (m) {
            ctx.telegram.sendMessage(m.to, `${m.isReply ? 'پاسخ پیام کاربر' + m.from : 'پیام ناشناس جدید'} 👈 ${ctx.message.text}`, Markup.inlineKeyboard([
                Markup.button.callback('پاسخ', 'answer ' + chat.id)
            ]))
            ctx.reply("پیامت ارسال شد");

            m.message = ctx.message.text;
            await m.save()
        }
    }
});

const scenarioTypeScene = new Scenes.BaseScene("SCENARIO_TYPE_SCENE_ID");

scenarioTypeScene.enter((ctx) => {
    ctx.session.myData = {};
    ctx.reply(
        "What is your drug?",
        Markup.inlineKeyboard([
            Markup.callbackButton("Movie", "MOVIE_ACTION"),
            Markup.callbackButton("Theater", "THEATER_ACTION"),
        ]).extra()
    );
});

scenarioTypeScene.action("THEATER_ACTION", (ctx) => {
    ctx.reply("You choose theater");
    ctx.session.myData.preferenceType = "Theater";
    return ctx.scene.enter("SOME_OTHER_SCENE_ID"); // switch to some other scene
});

scenarioTypeScene.action("MOVIE_ACTION", (ctx) => {
    ctx.reply("You choose movie, your loss");
    ctx.session.myData.preferenceType = "Movie";
    return ctx.scene.leave(); // exit global namespace
});

scenarioTypeScene.leave((ctx) => {
    ctx.reply("Thank you for your time!");
});

const stage = new Scenes.Stage([scenarioTypeScene]);

bot.hears("hi", (ctx) => {

    ctx.reply(
        "جواب به پیام",
        Markup.inlineKeyboard([Markup.callbackButton("پاسخ", "CONTACT_DATA_WIZARD_SCENE_ID")])
    );
});

stage.hears("CONTACT_DATA_WIZARD_SCENE_ID");

bot.launch();

const http = require('http');

let server = http.createServer(bot.webhookCallback(WEBHOOK_URL))

let server_port = process.env.YOUR_PORT || process.env.PORT || 80;
let server_host = process.env.YOUR_HOST || '0.0.0.0';

server.listen(server_port , server_host , (err) => {
    if (err) console.error(err);
    else {
        console.log('Listening on port %d', server_port);
        initDB();
    }
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
