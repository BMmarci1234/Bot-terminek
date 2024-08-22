const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'téma',
        description: 'Új téma kérdéseket jelenít meg.',
    },
    async execute(interaction) {
        const questions = [
            'Mit csinálnál 1 millió forinttal?',
            'Milyen lenne az ideális nyaralásod?',
            'Melyik az a dolog, amit mindig is meg akartál tanulni?',
            'Ha visszamehetnél a múltba és valamit változtatnál mi lenne az?',
            'Mi volt az eddigi legnagyobb kihívásod az életedben?',
            'Milyen könyvet ajánlanál mindenkinek, és miért?',
            'Mi az a dolog, amitől a legjobban félsz, és hogyan küzdesz ellene?',
            'Ha bármilyen szuperképességed lehetne, mi lenne az, és miért?',
            'Mi az, amit sosem próbáltál, de szeretnél kipróbálni?',
            'Ha találkozhatnál egy híres személlyel, ki lenne az, és mit kérdeznél tőle?',
            'Mi az a dolog, ami inspirál téged az életben?',
            'Hogyan képzeled el az ideális munkahelyet?',
            'Mi az a projekt, amire a legbüszkébb vagy?',
            'Milyen zenei stílust hallgatsz a legszívesebben, és miért?',
            'Mi az, amit szívesen megosztanál másokkal a saját tapasztalataidból?',
            'Ha bármit megváltoztathatnál a világban, mit változtatnál meg?',
            'Milyen szerepet játszik a technológia az életedben?',
            'Mi az, amit a legjobban szeretsz a saját kultúrádban?',
            'Hogyan képzeled el az életed 10 év múlva?',
            'Mi az a dolog, amit leginkább élvezel a szabadidődben?',
            'Melyik az a film vagy sorozat, amit sosem unod meg, és miért?',
            'Mi a legfontosabb tanács, amit valaha kaptál, és hogyan alkalmaztad azt?',
            'Mi az a hobbi vagy érdeklődési kör, ami teljesen elmerít?',
            'Milyen volt a legjobb döntésed az életedben, és miért?',
            'Mi az a dolog, amit szeretnél megtanulni, de eddig nem volt rá időd?',
            'Hogyan kezeled a stresszes helyzeteket, és mi az, ami segít megnyugtatni?',
            'Mi az, amit a legjobban élvezel a kapcsolataidban másokkal?',
            'Mi az a hely, amit mindig is el szerettél volna látogatni, és miért?',
            'Milyen ember szeretnél lenni a jövőben, és hogyan dolgozol ezen?',
            'Mi az a dolog, amiért a legjobban hálás vagy az életedben?',
        ];
        
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        
        const embed = new EmbedBuilder()
            .setAuthor({ name: '🤗 Téma!' })
            .setColor('LuminousVividPink')
            .setTitle('Új téma a beszélgetéshez!')
            .setDescription(randomQuestion);

        await interaction.reply({ embeds: [embed] });
    },
};
