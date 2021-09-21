module.exports ={
    name:'ping',
    description :'This is Ping Command!',
    execute(message, args){
        message.channel.send('pong!');
    },
};