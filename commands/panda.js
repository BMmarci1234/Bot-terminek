// commands/panda.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('panda')
        .setDescription('Kép pandákról.'),
    async execute(interaction) {
        try {
            const { default: fetch } = await import('node-fetch');
            const response = await fetch('https://some-random-api.com/animal/panda');
            const data = await response.json();
            const imageUrl = data.image;

            const embed = new EmbedBuilder()
                .setTitle('Itt van egy panda!')
                .setImage(imageUrl)
                .setColor('#FFD700');

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Hiba történt a panda kép betöltése közben.');
        }
    },
};
