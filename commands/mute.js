const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const db = require('../utils/database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Ideiglenesen elnémít egy felhasználót.')
        .addUserOption(option => option.setName('felhasználó').setDescription('A némítani kívánt felhasználó.').setRequired(true))
        .addStringOption(option => option.setName('length').setDescription('A némítás hossza (pl. 10s, 5m, 2h, 1d).').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),
    async execute(interaction) {
        const target = interaction.options.getUser('felhasználó');
        const lengthInput = interaction.options.getString('length').toLowerCase();
        const member = interaction.guild.members.cache.get(target.id);

        if (!member) {
            return interaction.reply({ content: 'Ez a felhasználó nem található a szerveren.', ephemeral: true });
        }

        // Konvertáljuk az időt milliszekundumokká
        let ms;
        const length = parseInt(lengthInput.slice(0, -1), 10);
        const unit = lengthInput.slice(-1);

        switch (unit) {
            case 's': // Másodperc
                ms = length * 1000;
                break;
            case 'm': // Perc
                ms = length * 60 * 1000;
                break;
            case 'h': // Óra
                ms = length * 60 * 60 * 1000;
                break;
            case 'd': // Nap
                ms = length * 24 * 60 * 60 * 1000;
                break;
            default:
                return interaction.reply({ content: 'Érvénytelen időtartam formátum. Használj s, m, h, vagy d egységeket.', ephemeral: true });
        }

        try {
            await member.timeout(ms, 'Némítás a bot által');

            db.run(`INSERT INTO punishments (user_id, guild_id, type, reason) VALUES (?, ?, ?, ?)`, 
                [target.id, interaction.guild.id, 'mute', `Némítás ${lengthInput}`]);

            const embed = new EmbedBuilder()
                .setTitle('Felhasználó némítva')
                .setDescription(`${target.tag} ${lengthInput} időtartamra el lett némítva.`)
                .addFields({ name: 'Időtartam', value: lengthInput })
                .setColor('#00FF00'); // Zöld

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Hiba történt a felhasználó némítása során.', ephemeral: true });
        }
    },
};
