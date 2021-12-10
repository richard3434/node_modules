const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767, partials: ['CHANNEL'] });
const { Token } = require("./config.json");

client.commands = new Collection();
client.prefixCommands = new Collection();
client.development = false;

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
})
module.exports = client;

require("./Handlers/Events")(client);
require("./Handlers/Commands")(client);

client.login(Token);