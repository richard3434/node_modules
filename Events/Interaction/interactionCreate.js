const { Client, CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "interactionCreate",

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client) {

        if (client.development && interaction.user.id != "670490330079952897") {
            const Response = new MessageEmbed()
            .setTitle("👷‍♂️ DEVELOPMENT 👷‍♂️")
            .setDescription("Sorry the bot will be back shortly when everything is working correctly.")
            .setColor("DARK_BUT_NOT_BLACK")

            return interaction.reply({embeds: [Response]})
        }

        if(interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("⛔ An error occured while running this command.")
            ]}) && client.commands.delete(interaction.commandName);

            command.execute(interaction, client)
        }
    }
}