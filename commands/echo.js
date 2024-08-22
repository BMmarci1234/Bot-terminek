const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('echo')
  .setDescription('Repeats what you say')
  .addStringOption(option =>
    option
      .setName('text')
      .setDescription('The text to repeat')
      .setRequired(true)
  ),

  async execute(interaction){
    if (interaction.commandName === 'echo') {
      let text = interaction.options.getString('text');
      await interaction.reply({ content: text });
    }
  }
}


