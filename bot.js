const { Keyboard, VK, getRandomId } = require("vk-io");
const { HearManager } = require("@vk-io/hear");
require("dotenv").config();

const vk = new VK({
  token: process.env.VK_TOKEN,
});
const bot = new HearManager();

const startKeybord = Keyboard.keyboard([
  [Keyboard.textButton({ label: "Начать", color: "primary" })],
]).oneTime();

const giftKeybord = Keyboard.keyboard([
  [
    Keyboard.textButton({
      label: "Забрать подарок",
      color: "positive",
    }),
  ],
  [
    Keyboard.urlButton({
      label: "Записаться",
      color: "primary",
      url: "https://dikidi.net/622341?p=3.pi-po-sm-mi-sd-cf&o=1&m=3665223&s=17918849&d=202411121100&r=804887041&rl=0_804887041&sdr=",
    }),
  ],
]).inline();

const signUpKeyboard = Keyboard.keyboard([
  [
    Keyboard.urlButton({
      label: "Записаться",
      color: "primary",
      url: "https://dikidi.net/622341?p=3.pi-po-sm-mi-sd-cf&o=1&m=3665223&s=17918849&d=202411121100&r=804887041&rl=0_804887041&sdr=",
    }),
  ],
  [
    Keyboard.textButton({
      label: "Назад",
      color: "negative",
    }),
  ],
]);

bot.hear(/^начать$/i, async (context) => {
  try {
    const user = await context.api.users.get({ user_ids: context.senderId });
    const userFirstname = user[0].first_name;

    context.send({
      message: `Здравствуйте, ${userFirstname}
\nБудем знакомы: я - Наталья Горб - мастер перманентного макияжа и тату в Ижевске.
Создаю естественную красоту для своих любимых клиентов ❤️
\n☝🏻Провожу бесплатные консультации, а также примерку будущего перманентного макияжа по фото, где индивидуально подбираю форму и цвет.
\n🎁 Дарю крутой подарок - 1000 рублей на перманентный макияж любой зоны - узнайте условия получения нажав на кнопку внизу `,
      keyboard: giftKeybord,
      signUpKeyboard,
      random_id: getRandomId(),
    });
  } catch {
    context.send({
      message: `Здравствуйте, Пользователь!
\nБудем знакомы: я - Наталья Горб - мастер перманентного макияжа и тату в Ижевске.
Создаю естественную красоту для своих любимых клиентов ❤️
\n☝🏻Провожу бесплатные консультации, а также примерку будущего перманентного макияжа по фото, где индивидуально подбираю форму и цвет.
\n🎁 Дарю крутой подарок - 1000 рублей на перманентный макияж любой зоны - узнайте условия получения нажав на кнопку внизу `,
      keyboard: giftKeybord,
      signUpKeyboard,
      random_id: getRandomId(),
    });
  }
});

bot.hear(/забрать подарок/i, (context) => {
  context.send({
    message:
      "Подпишитесь на мое сообщество в ВК: https://vk.com/n.g_tattooart1 и получите скидку на первое посещение в размере 1000 рублей!",
    keyboard: signUpKeyboard,
    random_id: getRandomId(),
  });
});

bot.hear(/записаться/i, (context) => {
  context.send({
    message: "Для записи нажмите на кнопку ниже",
    keyboard: signUpKeyboard,
    random_id: getRandomId(),
  });
});

bot.hear(/назад/i, (context) => {
  context.send({
    message: "Начать запись заново?",
    keyboard: startKeybord,
    random_id: getRandomId(),
  });
});

vk.updates.on("message_new", bot.middleware, { once: true });
vk.updates.startPolling({ skipUpdates: true }).catch(console.error);
