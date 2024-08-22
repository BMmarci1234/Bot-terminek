// commands/dog.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Kép kutyákról.'),
    async execute(interaction) {
        try {
            const { default: fetch } = await import('node-fetch');
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            const imageUrl = data.message;

            const embed = new EmbedBuilder()
                .setTitle('Itt van egy kutya!')
                .setImage(imageUrl)
                .setColor('#FFD700');

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Hiba történt a kutya kép betöltése közben.');
        }
    },
};
