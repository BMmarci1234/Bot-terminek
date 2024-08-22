const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const db = require('../utils/database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kilépteti a felhasználót a szerverről.')
        .addUserOption(option => option.setName('felhasználó').setDescription('A kiléptetendő felhasználó.').setRequired(true))
        .addStringOption(option => option.setName('ok').setDescription('A kiléptetés oka.').setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        const target = interaction.options.getUser('felhasználó');
        const reason = interaction.options.getString('ok') || 'Nincs megadva';
        const member = interaction.guild.members.cache.get(target.id);

        if (!member) {
            return interaction.reply({ content: 'Ez a felhasználó nem található a szerveren.', ephemeral: true });
        }

        try {
            await member.kick(reason);

            db.run(`INSERT INTO punishments (user_id, guild_id, type, reason) VALUES (?, ?, ?, ?)`, 
                [target.id, interaction.guild.id, 'kick', reason]);

            const embed = new EmbedBuilder()
                .setTitle('Felhasználó kiléptetve')
                .setDescription(`${target.tag} ki lett léptetve a szerverről.`)
                .addFields({ name: 'Indok', value: reason })
                .setColor('#FFFF00'); // Sárga

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Hiba történt a felhasználó kiléptetése során.', ephemeral: true });
        }
    },
};
