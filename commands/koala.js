// commands/koala.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('koala')
        .setDescription('Kép koalákról.'),
    async execute(interaction) {
        try {
            const { default: fetch } = await import('node-fetch');
            const response = await fetch('https://some-random-api.com/animal/koala');
            const data = await response.json();
            const imageUrl = data.image;

            const embed = new EmbedBuilder()
                .setTitle('Itt van egy koala!')
                .setImage(imageUrl)
                .setColor('#8B4513');

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Hiba történt a koala kép betöltése közben.');
        }
    },
};
