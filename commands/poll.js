const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('The question of the poll')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('options')
        .setDescription('The options for the poll (separated by commas)')
        .setRequired(true)),

  async execute(interaction) {
    const question = interaction.options.getString('question');
    const options = interaction.options.getString('options').split(',');

    if (options.length <= 1) {
      return interaction.reply("Not enough options provided!");
    }
    if (options.length > 10) {
      return interaction.reply("Too many options provided! Maximum 10 options allowed.");
    }

    const reactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

    let pollString = `**${question}**\n\n`;

    options.forEach((option, index) => {
      pollString += `${reactions[index]} ${option}\n`;
    });

    await interaction.reply(pollString);

    for (let i = 0; i < options.length; i++) {
      await interaction.channel.messages.fetch(interaction.lastReply.id).then(msg => {
        msg.react(reactions[i]);
      });
    }
  },
};
