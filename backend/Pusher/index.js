const Pusher = require("pusher")

const pusher = new Pusher({
    appId: "1751823",
    key: "6ae19aaa21ca949c00b1",
    secret: "b761c884201faaa29342",
    cluster: "ap2",
    useTLS: true,
});

module.exports = { pusher };