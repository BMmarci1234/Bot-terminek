// commands/cat.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Kép cicákról.'),
    async execute(interaction) {
        try {
            const { default: fetch } = await import('node-fetch');
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();
            const imageUrl = data[0].url;

            const embed = new EmbedBuilder()
                .setTitle('Itt van egy cica!')
                .setImage(imageUrl)
                .setColor('#FF4500');

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Hiba történt a cica kép betöltése közben.');
        }
    },
};
