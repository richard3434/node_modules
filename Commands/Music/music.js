const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "music",
    description: "A complete music system.",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "play",
            description: "Play a song.",
            type: "SUB_COMMAND",
            options: [{ name: "query", description: "Provide a name or a url for the song to play", type: "STRING", required: true}]
        },
        {
            name: "volume",
            description: "Alter the volume of the song.",
            type: "SUB_COMMAND",
            options: [{ name: "percent", description: "10 = 10%", type: "NUMBER", required: true}]
        },
        {
            name: "settings",
            description: "Select Options",
            type: "SUB_COMMAND",
            options: [{ name: "options", description: "Select an option.", type: "STRING", required: true,
            choices: [
                {name: "queue", value: "queue"},
                {name: "skip", value: "skip"},
                {name: "pause", value: "pause"},
                {name: "resume", value: "resume"},
                {name: "stop", value: "stop"},
            ]}]
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if(!VoiceChannel)
        return interaction.reply({content: "You must be in a voice channel to able to use the music command.", ephemeral: true});

        if(guild.me.voice.channelId && VoiceChannel.id == guild.me.voice.channelId)
        return interaction.reply({content: `I'm already playing music in <#${guild.me.voice.channelId}>`, ephemeral: true});

        try {
            switch(options.getSubcommand()) {
                case "play" : {
                    client.distube.playVoiceChannel( VoiceChannel, options.getString("query"), { textChannel: channel, member: member });
                    return interaction.reply({content: "🎼 Request recieved."});
                }
                case "volume" : {
                    const Volume = options.getNumber("percent");
                    if(Volume > 100 || Volume < 1)
                    return interaction.reply({content: "You have to specify a number between 1 and 100."})

                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({content: `📶 Volume has been set to \`${Volume}%\``});
                }
                case "settings" : {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if(!queue)
                    return interaction.reply({content: "⛔ There is no queue"});

                    switch(options.getString("options")) {
                        case "skip" :
                        await queue.skip(VoiceChannel);
                        return interaction.reply({content: "⏭️ Song has been skipped."})
                        case "stop" : 
                        await queue.stop(VoiceChannel);
                        return interaction.reply({content: "⏹️ Music has been stopped."})
                        case "pause" :
                        await queue.pause(VoiceChannel);
                        return interaction.reply({content: "⏸️ Song has been paused."})
                        case "resume" :
                        await queue.resume(VoiceChannel);
                        return interaction.reply({content: "⏩ Song has been resumed."})
                        case "queue" :
                        return interaction.reply({embeds: [new MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`${queue.songs.map(
                            (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`
                            )]});
                    }
                    return;
                }
            }
        } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`⛔ Alert Contact the bot owner asap! antisocial#8274: ${e}`)
            return interaction.reply({embeds: [errorEmbed]});
        }


    }
}