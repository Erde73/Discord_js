/* Node.jsのエラー吐く設定を回避するやつ */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable space-before-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-empty */
/* eslint-disable no-inline-comments */
/* eslint-disable brace-style */
/* ここまで*/

// Discord.jsモジュールを読み込む
const Discord = require('discord.js');
// eslint-disable-next-line no-unused-vars
const { prefix, prefix2, token } = require('./config.json');
// 新しいDiscordクライアントを作成
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });


// クライアントの準備ができた際に実行されます
// このイベントはログインした後に１度だけ実行します
client.once('ready', () => {
	console.log('準備完了！');
	client.channels.cache.get('705142101385543703').send('起動しました！');
});

// messageを受け止める．
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;// prefixで始まらない場合，またはbotの発言の場合は何も返さない．
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();// 最初のコマンド部分だけを切り取りcommandに格納，残りだけをargsに格納

	if (command === 'ping') {// pingPongやりとり
		message.channel.send('Pong.');
	} else if (command === 'beep'){// beepBoopやりとり
		message.channel.send('Boop.');
	} else if (command === 'server') {// サーバー情報を返送
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	} else if (command === 'args-info') {// args-infoと送られた時，
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);// 引数がなければこれをreturn
		} else if (args[0] === 'foo') {// fooが来たらbarを返す
			return message.channel.send('bar');
		}
		message.channel.send(`First argument: ${args[0]}`);
		message.channel.send(`Command name: ${command}\nArguments: ${args}`);// 引数があればそれを配列の形で返す
		message.channel.send(`Arguments length:${args.length}`);
	} else if (command === 'user-info') {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	} else if (command === 'info') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		} else if (args[0] === 'foo') {
			return message.channel.send('bar');
		}
		message.channel.send(`First argument: ${args[0]}`);
	} else if (command === 'kick') {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}
		const taggedUser = message.mentions.users.first();
		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	} else if (command === 'avatar') {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ dynamic: true })}>`);
		}
	}
});

// トークンを使ってDiscordにログイン
client.login(token);

/*
if (message.content.startsWith(`${prefix}ping`)) {// pingをもらったらPongを返す
		message.channel.send('Pong.');
	} else if (message.content.startsWith(`${prefix}beep`)) {// !beepをもらったらboopを返す
		message.channel.send('Boop.');
	} else if (message.content === `${prefix}server`) { // !serverでサーバー名を返す
		message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	} else if (message.content === `${prefix}available`) {
		message.channel.send(`${message.guild.available}`);
	} else if (message.content === `${prefix}userid`){
		message.channel.send(`Your user ID:  ${message.author.id}`);
	}
*/