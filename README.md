# Discord bot
[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&width=435&lines=Ez+a+bot+Tempinek+k%C3%A9sz%C3%BClt)](https://git.io/typing-svg)

Ez a bot egy Közép haladó szintű bot (én véleményem szerint). A botnak vannak menő részei, de vedd figyelembe, hogy a bot discord.js@V14-el készült.

# Bot futtatása az első alkalommal

```
git clone https://github.com/BMmarci1234/Bot-terminek
cd Bot-terminek
npm init -y
npm install @discordjs/rest axios discord-api-types discord.js dotenv fs node-fetch path sqlite3
```
**Ezután menj [ide](https://discord.com/developers/applications) és készíts el egy új application-t.**

**Állítsd be a botot ilyenre amint a képen látható a bot szekció alatt**

![image](github\nemtom.png) 

**Szerezd meg a bot tokenj-ét, clientId-jét, guildId-ját, és másold be a config.json fájlba.**

**Ezután menj [ide](https://openweathermap.org/) és jelentkezz be, majd szerezd meg az API KEY-t amit a commands/időjárás.js fájlban másold be. Az időjárás.js-nek a 10. sorába:**

```
const apiKey = 'TE API KEY-D';
```
**Na most hívd meg a discord botodat a szerveredre így, és másold be a "TE CLIENTID-D" helyére a clientId-dat**

```
https://discord.com/api/oauth2/authorize?client_id=TE CLIENTID-D&permissions=8&scope=bot%20applications.commands
```

**Ezután csak futtasd ezeket a parancsokat a helyes sorrendben:**

```
node syncdb.js
node deploy-commands.js
node index.js
```
**Megjegyzés** Minden egyes alkallomal amikor elindítod a botodat írd be a föllöti lévő parancsokat.

# Parancsok

/időjárás  
/némítás  
/kirúgás  
/ban  
/büntetések  
/téma  
/nyuszi  
/cat  
/dog  
/duck  
/róka  
/koala  
/panda  
/vöröspanda  
/figyelmeztetés  
/8-ball  
/echo  
/flip  
/hello  
/ping  
/poll  
