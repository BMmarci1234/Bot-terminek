const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('../utils/database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('büntetéseim')
        .setDescription('Megmutatja egy felhasználó büntetéseit.')
        .addUserOption(option => option.setName('felhasználó').setDescription('Az a felhasználó, akinek a büntetéseit látni szeretnéd.').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        const target = interaction.options.getUser('felhasználó');

        db.all(`SELECT * FROM punishments WHERE user_id = ? AND guild_id = ?`, [target.id, interaction.guild.id], (err, rows) => {
            if (err) {
                console.error(err);
                return interaction.reply({ content: 'Hiba történt a büntetések lekérdezése során.', ephemeral: true });
            }

            if (rows.length === 0) {
                const noPunishmentsEmbed = new EmbedBuilder()
                    .setTitle('Nincs büntetés')
                    .setDescription(`${target.tag} nem rendelkezik büntetésekkel ezen a szerveren.`)
                    .setColor('#00FF00'); // Zöld

                return interaction.reply({ embeds: [noPunishmentsEmbed], ephemeral: true });
            }

            const punishmentList = rows.map((row, index) => `${index + 1}. ${row.type} - ${row.reason}`).join('\n');

            const embed = new EmbedBuilder()
                .setTitle('Felhasználó büntetései')
                .setDescription(`**${target.tag} büntetései:**\n${punishmentList}`)
                .setColor('#FF00FF'); // Rózsaszín

            interaction.reply({ embeds: [embed], ephemeral: true });
        });
    },
};
