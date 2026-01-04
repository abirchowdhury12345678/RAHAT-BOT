const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "owner",
		author: "Rahat",
		role: 0,
		shortDescription: " ",
		longDescription: "",
		category: "admin",
		guide: "{pn}"
	},

	onStart: async function ({ api, event }) {
		try {
			const ownerInfo = {
				name: '𝑬𝒘𝑹 Rahat',
				gender: '𝑴𝒂𝑳𝒆',
				Birthday: '03-𝟎4-𝟐𝟎𝟎7',
				religion: '𝙄𝒔𝒍𝑨𝒎',
				hobby: '𝑺𝒍𝒆𝒆𝑷𝒊𝒏𝑮',
				Fb: 'https://www.facebook.com/Sh4n.Dev1',
				Relationship: '𝑺𝒊𝒏𝑮𝒆𝒍',
				Height: '5"7+'
			};

			const bold = 'https://drive.google.com/uc?export=download&id=1J4yQ13L2WTpdOuqcP0yEmzULACdwfvnQ';
			const tmpFolderPath = path.join(__dirname, 'tmp');

			if (!fs.existsSync(tmpFolderPath)) {
				fs.mkdirSync(tmpFolderPath);
			}

			const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
			const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

			fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

			const response = `
◈ 𝖮𝖶𝖭𝖤𝖱 𝖨𝖭𝖥𝖮𝖱𝖬𝖠𝖳𝖨𝖮𝖭:\n
 ~Name: ${ownerInfo.name}
 ~Gender: ${ownerInfo.gender}
 ~Birthday: ${ownerInfo.Birthday}
 ~Religion: ${ownerInfo.religion}
 ~Relationship: ${ownerInfo.Relationship}
 ~Hobby: ${ownerInfo.hobby}
 ~Fb: ${ownerInfo.Fb}
 ~Height: ${ownerInfo.Height}
			`;

			await api.sendMessage({
				body: response,
				attachment: fs.createReadStream(videoPath)
			}, event.threadID, event.messageID);
			
			fs.unlinkSync(videoPath);

			api.setMessageReaction('😍', event.messageID, (err) => {}, true);
		} catch (error) {
			console.error('Error in ownerinfo command:', error);
			return api.sendMessage('An error occurred while processing the command.', event.threadID);
		}
	},

	onChat: async function ({ api, event }) {
		if (event.body && event.body.toLowerCase() === "owner") {
			this.onStart({ api, event });
		}
	}
};
