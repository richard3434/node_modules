const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "development",
    description: "Only for bot owner.",
    // permission: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction, client) {



        if (client.development === false && interaction.user.id == "670490330079952897") {
            
            client.development = true;
            
            const bot = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Development mode **enabled** ✅")
                .setDescription(`👷‍♂️ The bot has been put into development mode. 👷‍♂️`)
                .setTimestamp()
                
            return interaction.reply({ embeds: [bot], fetchReply: true })//.then(msg => { setTimeout(() => msg.delete(), 5000) })

        }

        if (client.development && interaction.user.id == "670490330079952897"){
            
            client.development = false;

            const bot = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Development mode **disabled** ⛔")
                .setDescription(`👷‍♂️ The bot has been taken out of development mode. 👷‍♂️`)
                .setTimestamp()

            return interaction.reply({ embeds: [bot], fetchReply: true })//.then(msg => { setTimeout(() => msg.delete(), 5000) })

        }
        
        
        interaction.reply({ content: "No fuck you.", fetchReply: true }).then(msg => { setTimeout(() => msg.delete(), 5000) })
        
    }
}