const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vöröspanda')
        .setDescription('Kép vöröspandákról.'),
    async execute(interaction) {
        try {
            const { default: fetch } = await import('node-fetch');
            // Használj egy API-t, amely ténylegesen visszaad egy vöröspanda képet
            const response = await fetch('https://some-random-api.ml/img/red_panda');
            const data = await response.json();
            const imageUrl = data.link; // Az API ténylegesen a "link" kulcsot használja

            const embed = new EmbedBuilder()
                .setTitle('Itt van egy vöröspanda!')
                .setImage(imageUrl)
                .setColor('#FF5733'); // Narancssárga szín

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'Hiba történt a vöröspanda kép betöltése közben.', ephemeral: true});
        }
    },
};
