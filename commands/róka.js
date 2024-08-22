// commands/fox.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fox')
        .setDescription('Kép rókákról.'),
    async execute(interaction) {
        try {
            const { default: fetch } = await import('node-fetch');
            const response = await fetch('https://randomfox.ca/floof/');
            const data = await response.json();
            const imageUrl = data.image;

            const embed = new EmbedBuilder()
                .setTitle('Itt van egy róka!')
                .setImage(imageUrl)
                .setColor('#FF6347');

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Hiba történt a róka kép betöltése közben.');
        }
    },
};
