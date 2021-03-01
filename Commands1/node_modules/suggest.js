const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "sugestao",
    aliases: [],
    description: "Faça uma sugestão e faça com que a comunidade vote",
    category: "utility",
    usage: "sugestao <msg>",
    run: async (client, message, args) => {
        let suggestion = args.slice(0).join(" ");
        let SuggestionChannel = message.guild.channels.cache.find(channel => channel.name === "📖┇𝙎𝙪𝙜𝙚𝙨𝙩𝙤𝙚𝙨");
        if (!SuggestionChannel) return message.channel.send("Cria o canal primeiro!");
        const embed = new MessageEmbed()
            .setTitle("Nova Sugestão")
            .setDescription(suggestion)
            .setColor("ORANGE")
            .setFooter(`${message.author.tag} | ID: ${message.author.id}`)
            .setTimestamp()
        SuggestionChannel.send(embed).then(msg => {
            msg.react("✅")
            msg.react("❌")
        });
    }
}