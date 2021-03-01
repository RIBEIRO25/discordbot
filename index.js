const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')

const roleClaim = require('./role-claim')


client.on('ready', () => {
  console.log('The client is ready!')
  
  client.user.setPresence({
    status: "dnd",
    activity: {
      name: `e configurando`,
      type: 0,
    },
  })


  roleClaim(client)

  client.commands = new Discord.Collection()
const fs = require("fs")
fs.readdir("./commands/", (error, files) => {
    files = files.filter(f => f.endsWith(".js"))
    files.forEach(f => {
        const command = require(`./commands/${f}`)
        client.commands.set(command.name, command)
        console.log(`Command ${command.name} was loaded!`)
    });
});

client.on("message", message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).split(" ")
    const command = args.shift()
    const cmd = client.commands.get(command)
    if (cmd) {
        cmd.run(client, message, args)
    } else return;
});

  command(client, ['ping', 'test'], (message) => {
    message.channel.send('Pong!')
  })

  command(client, 'ip', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `Ip do Servidor Brevemente!`
      )
    })
  })

  command(client, ['lc', 'limparchat'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })
})

client.on('guildMemberAdd', member =>{
  const channel = member.guild.channels.cache.find(channel => channel.name === "🌊┇𝘽𝙚𝙢-𝙑𝙞𝙣𝙙𝙤");

  if(!channel) return;
  let embed = new Discord.MessageEmbed()
  .setTitle(`Bem Vindo(a)!`) 
  .setDescription(`${member.user.tag} entrou no servidor`) // or what you want it to say.
  .setColor("ORANGE")
 
  .setTimestamp()

  channel.send(embed)

  let mainRole = member.guild.roles.cache.find(role => role.name === "MEMBRO");
  member.roles.add(mainRole.id);

});

client.on('guildMemberRemove', member =>{
  const channel = member.guild.channels.cache.find(channel => channel.name === "📤┇𝙎𝙖𝙞𝙙𝙖");

  if(!channel) return;
  let embed = new Discord.MessageEmbed()
  .setTitle(`Membro saiu!`) 
  .setDescription(`${member.user.tag} saiu do servidor`) // or what you want it to say.
  .setColor("ORANGE")
 
  .setTimestamp()

  channel.send(embed)

});

client.login(config.token)
