const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('hello')
  .setDescription('Says hello to someone')
  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('The user to say hi to')
      .setRequired(false)
  ),

  async execute(interaction){
    let user = interaction.options.getUser('user');
    if (!user) user = interaction.user;
    await interaction.reply(`Hello ${user.toString()}!`);
  }
}

