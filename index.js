const {PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const config = require("./config.js");
const db = require("croxydb")
const client = new Client({
  partials: [
    Partials.Message, // for message
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.Reaction, // for message reaction
    Partials.GuildScheduledEvent, // for guild events
    Partials.User, // for discord user
    Partials.ThreadMember, // for thread member
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildBans, // for manage guild bans
    GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildWebhooks, // for discord webhooks
    GatewayIntentBits.GuildInvites, // for guild invite managing
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildPresences, // for user presence things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageReactions, // for message reactions things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.DirectMessages, // for dm messages
    GatewayIntentBits.DirectMessageReactions, // for dm message reaction
    GatewayIntentBits.DirectMessageTyping, // for dm message typinh
    GatewayIntentBits.MessageContent, // enable if you need message content things
  ],
});

module.exports = client;

require("./events/message.js")
require("./events/ready.js")
client.on('voiceStateUpdate', (newMember) => {
  const db = require("croxydb")
  if (newMember.member.voice.channel != null && newMember.member.voice.channel.name.startsWith("??zel Oda Olu??tur")) {
  newMember.guild.channels.create({name: `??????? ${newMember.member.displayName}`, type: ChannelType.GuildVoice}).then((sesli) => {
    newMember.member.voice.setChannel(sesli.id)
db.set(`oda_${newMember.id}`, sesli.id)
db.set(`oda2_${newMember.id}`, sesli)
sesli.permissionOverwrites.create(
  newMember.guild.roles.everyone, {ViewChannel: false}
  
  )
  })
}
      }   
)

const mod = new ModalBuilder()
.setCustomId('eklemenu')
.setTitle('Godzilla - Kullan??c?? Ekleme!')
  const e = new TextInputBuilder()
  .setCustomId('uyeid')
  .setLabel('Kullan??c?? ID')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(10)
  .setPlaceholder('Eklemek istedi??iniz kullan??c?? ID girin.')
  .setRequired(true)
  const row2 = new ActionRowBuilder().addComponents(e);
  
  mod.addComponents(row2);
client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "ekle"){
    let odasiz = db.fetch(`oda_${interaction.user.id}`)
    if (!odasiz) return interaction.reply({content: "Sana Ait Bir Oda Bulamad??m!", ephemeral: true})
    await interaction.showModal(mod);
	}
})  

const mod2 = new ModalBuilder()
.setCustomId('eklemenu2')
.setTitle('Godzilla - Kullan??c?? ????karma!')
  const a = new TextInputBuilder()
  .setCustomId('cikarid')
  .setLabel('Kullan??c?? ID')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(10)
  .setPlaceholder('????karmak istedi??iniz kullan??c?? ID girin.')
  .setRequired(true)
  const row3 = new ActionRowBuilder().addComponents(a);
  
  mod2.addComponents(row3);
client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "????kar"){
    let odasiz = db.fetch(`oda_${interaction.user.id}`)
    if (!odasiz) return interaction.reply({content: "Sana Ait Bir Oda Bulamad??m!", ephemeral: true})
    await interaction.showModal(mod2);
	}
})  

client.on('interactionCreate', async interaction => {
  if (interaction.type !== InteractionType.ModalSubmit) return;
  if (interaction.customId === 'eklemenu2') {
      const id = interaction.fields.getTextInputValue('cikarid')
    let oda = interaction.member.voice.channel
    console.log(oda)
    oda.permissionOverwrites.create(
      id, {ViewChannel: false}      
      )
      interaction.reply("<@"+id+"> Adl?? Kullan??c?? Odadan Ba??ar??yla At??ld??")
    } else {
  }
})
client.on('interactionCreate', async interaction => {
  if (interaction.type !== InteractionType.ModalSubmit) return;
  if (interaction.customId === 'eklemenu') {
      const id = interaction.fields.getTextInputValue('uyeid')
    let oda = interaction.member.voice.channel
    console.log(oda)
    oda.permissionOverwrites.create(
      id, {ViewChannel: true}      
      )
      interaction.reply("<@"+id+"> Adl?? Kullan??c?? Odaya Eklendi")
    } else {
  }
})

client.login(process.env.TOKEN)