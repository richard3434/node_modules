const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Pong!",
    permissions: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */
    execute(interaction) {
        interaction.reply({contents: "🏓 Pong!"})
    }
}