const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const db = require('../utils/database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Feloldja egy felhasználó némítását.')
        .addUserOption(option => option.setName('felhasználó').setDescription('A némítást feloldó felhasználó.').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),
    async execute(interaction) {
        const target = interaction.options.getUser('felhasználó');
        const member = interaction.guild.members.cache.get(target.id);

        if (!member) {
            return interaction.reply({ content: 'Ez a felhasználó nem található a szerveren.', ephemeral: true });
        }

        try {
            await member.timeout(null, 'Némítás feloldása a bot által');

            // Távolítsuk el a némítást az adatbázisból
            db.run(`DELETE FROM punishments WHERE user_id = ? AND guild_id = ? AND type = ?`, 
                [target.id, interaction.guild.id, 'mute']);

            const embed = new EmbedBuilder()
                .setTitle('Némítás feloldva')
                .setDescription(`${target.tag} némítása fel lett oldva.`)
                .setColor('#00FF00'); // Zöld

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Hiba történt a némítás feloldása során.', ephemeral: true });
        }
    },
};
