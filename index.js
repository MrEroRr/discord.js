const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token } = require('./config.json');
const PREFEX ='!M';
const fs = require ('fs');
client.commmands  =  new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commmands.set(command.name ,command);
}
client.on('ready', () =>{
    console.log('Ready');
} )
client.on('message', message=>{
    if(!message.content.startsWith(PREFEX) || message.author.bot) return;
  const args = message.content.slice(PREFEX.length).split(/ + /);
  const command = args.shift().toLowerCase();
  if (command === 'ping'){
      client.commmands.get('ping').execute(message,args);
  }
  else if (command === 'website'){
    client.commmands.get('website').execute(message,args);
}
  else if (command === 'version'){
    client.commmands.get('version').execute(message,args);
}
  else if (command === 'author'){
    client.commmands.get('author').execute(message,args);
}
  else if (command === 'FBlink'){
    client.commmands.get('FBlink').execute(message,args);
}
  else if (command === 'info'){
    client.commmands.get('info').execute(message,args);
} else if (command === 'p'){
    client.commmands.get('p').execute(message,args);
} else if (command === 'leave'){
    client.commmands.get('leave').execute(message,args);
} 

});




client.login(token);
  
  
  
  
  
  
  
  
 


/* client.on("message", msg => {
    if (msg.content.toLowerCase().startsWith(PREFEX + "clearchat")) {
        async function clear() {
            msg.delete();
            const fetched = await msg.channel.fetchMessages({limit: 99});
            msg.channel.bulkDelete(fetched);
        }
        clear();
    } */

