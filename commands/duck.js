// commands/duck.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('duck')
        .setDescription('Kép kacsákról.'),
    async execute(interaction) {
        try {
            const { default: fetch } = await import('node-fetch');
            const response = await fetch('https://random-d.uk/api/v2/random');
            const data = await response.json();
            const imageUrl = data.url;

            const embed = new EmbedBuilder()
                .setTitle('Itt van egy kacsa!')
                .setImage(imageUrl)
                .setColor('#00FF00');

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Hiba történt a kacsa kép betöltése közben.');
        }
    },
};
