const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('időjárás')
        .setDescription('Megmutatja az aktuális időjárást a legnagyobb magyar városokban.'),
    async execute(interaction) {
        const apiKey = 'TE API KEY-D';
        const cities = ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs', 'Győr'];
        const weatherData = [];

        for (const city of cities) {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=hu`;

            try {
                const response = await axios.get(url);
                const data = response.data;

                const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' });
                const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' });

                weatherData.push({
                    name: city,
                    temperature: data.main.temp,
                    minTemp: data.main.temp_min,
                    maxTemp: data.main.temp_max,
                    description: data.weather[0].description,
                    icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
                    sunrise: sunriseTime,
                    sunset: sunsetTime
                });

            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Érvénytelen API kulcs. Ellenőrizd az OpenWeatherMap API kulcsodat.');
                    await interaction.reply('Hiba történt az időjárási adatok lekérésekor: Érvénytelen API kulcs.');
                    return;
                } else {
                    console.error('Hiba történt az időjárási adatok lekérésekor:', error.message);
                    await interaction.reply(`Hiba történt az időjárási adatok lekérésekor: ${error.message}`);
                    return;
                }
            }
        }

        const weatherEmbed = new EmbedBuilder()
            .setTitle('🌦 Időjárásjelentés')
            .setDescription('A mai napra vonatkozó időjárásjelentés Magyarország legnagyobb városaiban.')
            .setColor(0x00AE86)
            .setTimestamp();

        weatherData.forEach(cityWeather => {
            weatherEmbed.addFields(
                { name: cityWeather.name, value: 
                    `**${cityWeather.description.charAt(0).toUpperCase() + cityWeather.description.slice(1)}**\n` +
                    `🌡 **Max:** ${cityWeather.maxTemp}°C | **Min:** ${cityWeather.minTemp}°C\n` +
                    `🌅 **Napkelté:** ${cityWeather.sunrise}\n` +
                    `🌇 **Napnyugta:** ${cityWeather.sunset}\n` 
                    , inline: true }
            );

            weatherEmbed.setThumbnail(cityWeather.icon);  // Az ikon beállítása a beágyazott üzenet tetején
        });

        await interaction.reply({ embeds: [weatherEmbed] });
    },
};
