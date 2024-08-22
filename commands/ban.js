const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const db = require('../utils/database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Kitilt egy felhasználót a szerverről.')
        .addUserOption(option => option.setName('felhasználó').setDescription('A kitiltandó felhasználó.').setRequired(true))
        .addStringOption(option => option.setName('ok').setDescription('A kitiltás oka.').setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const target = interaction.options.getUser('felhasználó');
        const reason = interaction.options.getString('ok') || 'Nincs megadva';
        const member = interaction.guild.members.cache.get(target.id);

        if (!member) {
            return interaction.reply({ content: 'Ez a felhasználó nem található a szerveren.', ephemeral: true });
        }

        try {
            await member.ban({ reason });

            db.run(`INSERT INTO punishments (user_id, guild_id, type, reason) VALUES (?, ?, ?, ?)`, 
                [target.id, interaction.guild.id, 'ban', reason]);

            const embed = new EmbedBuilder()
                .setTitle('Felhasználó kitiltva')
                .setDescription(`${target.tag} ki lett tiltva.`)
                .addFields({ name: 'Indok', value: reason })
                .setColor('#FF0000'); // Piros

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Hiba történt a felhasználó kitiltása során.', ephemeral: true });
        }
    },
};
