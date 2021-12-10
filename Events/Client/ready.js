const { Client } = require("discord.js")
const mongoose = require("mongoose");
const { Database } = require("../../Structures/config.json");
module.exports = {
    name: "ready",
    once: true,
    /**
    * @param {Client} client
    */
    execute(client) {
        console.log("Edwar is now online!")
        setInterval(() => {
            if (client.development) {
                client.user.setStatus("dnd")
                client.user.setActivity("Under Development", { type: "PLAYING"})
                return
            }
            if (!client.development) {
                client.user.setStatus("online")
                client.user.setActivity("/ping", { type: "WATCHING" })
            }
        }, 30000);

        if(!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("The Client is now connected to the database!");
        }).catch((err) => {
            console.log(err)
        })
    }
}