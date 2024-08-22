const { token, guildId } = require('./config.json');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Add this if your bot needs to manage members
  ]
});

client.commands = getCommands(path.join(__dirname, 'commands'));

client.once(Events.ClientReady, () => {
  console.log('The bot has started successfully!');
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(token);

function getCommands(dir) {
  const commands = new Collection();
  const commandFiles = getFiles(dir);

  for (const commandFile of commandFiles) {
    try {
      const command = require(commandFile);
      if (command.data && typeof command.data === 'object') {
        commands.set(command.data.name, command);
      } else {
        console.error(`Failed to load command ${commandFile}: No 'data' property found.`);
      }
    } catch (error) {
      console.error(`Failed to load command ${commandFile}:`, error);
    }
  }
  return commands;
}

function getFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let commandFiles = [];

  for (const file of files) {
    if (file.isDirectory()) {
      commandFiles = [
        ...commandFiles,
        ...getFiles(path.join(dir, file.name)),
      ];
    } else if (file.name.endsWith('.js')) {
      commandFiles.push(path.join(dir, file.name));
    }
  }
  return commandFiles;
}
