const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const db = require('../utils/database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Figyelmeztet egy felhasználót.')
        .addUserOption(option => option.setName('felhasználó').setDescription('A figyelmeztetni kívánt felhasználó.').setRequired(true))
        .addStringOption(option => option.setName('ok').setDescription('A figyelmeztetés oka.').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers), // Csak a Kick joggal rendelkező használhatja
    async execute(interaction) {
        const target = interaction.options.getUser('felhasználó');
        const reason = interaction.options.getString('ok');

        db.run(`INSERT INTO punishments (user_id, guild_id, type, reason) VALUES (?, ?, ?, ?)`, 
            [target.id, interaction.guild.id, 'warn', reason]);

        const embed = new EmbedBuilder()
            .setTitle('Felhasználó figyelmeztetve')
            .setDescription(`${target.tag} figyelmeztetve lett.`)
            .addFields({ name: 'Indok', value: reason })
            .setColor('#FFA500'); // Narancssárga

        await interaction.reply({ embeds: [embed] });
    },
};
