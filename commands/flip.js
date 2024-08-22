const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription('Flip a coin'),

  async execute(interaction) {
    const num = Math.random() * 2;
    let result;

    if (num > 1) {
      result = 'Tails!';
    } else {
      result = 'Heads!';
    }

    const flipEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Coin Flip')
      .setDescription(`The result is: ${result}`)
      .setTimestamp();

    return interaction.reply({ embeds: [flipEmbed] });
  }
};
