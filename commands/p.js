const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { VoiceChannel } = require('discord.js');
module.exports ={
    name:'p',
    descrption: 'Play Music',
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('You need to be in a channel to Play Music!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send ('You dont have the Connect permissions');
        if (!permissions.has('SPEAK')) return message.channel.send ('You dont have the Speak permissions');
        if(!args.length) return message.channel.send('You need to Provide a link or a Keyword!');
        const connection = await VoiceChannel.join();
        const videoFinder = async (quarry) => {
            const videoResult = await ytSearch(quarry);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] :null;
        }
        const video = await videoFinder(args.join(' '));
        if(video){
            const stream =ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seak :0 , volume:1})
            .on('finish',() =>{
                voicechannel.leave();
            });
            await message.reply(`:thumbsup: Now Playing ***${video.title}***`)
        } else {
             message.channel.send('No Video result found');
            }
        }
    }
    