import { bot } from "../config/index.ts";

bot.command("unmute", async (ctx) => {
  let msg = ctx.message;

  // user  who typed command
  let command_user = msg.from;
  // user who got replied
  let replied_user = msg.reply_to_message.from;

  // status
  let command_user_status = await bot.api.getChatMember(
    msg.chat.id,
    command_user.id,
  );
  let replied_user_status = await bot.api.getChatMember(
    msg.chat.id,
    replied_user.id,
  );

  let permissions = {
    can_send_messages: true,
    can_send_media_messages: true,
    can_send_polls: true,
    can_send_other_messages: true,
    can_invite_users: true,
    can_add_web_page_previews: true,
  };
  console.log(replied_user_status.status)
  if (command_user_status.status == "member") {
    await ctx.reply("Oddiy a'zolar mute bera olishmaydi!");
  } else {
    if (replied_user_status.status == "restricted") {
      await bot.api.restrictChatMember(
        msg.chat.id,
        replied_user.id,
        permissions,
      );
      await ctx.reply(`${replied_user.first_name} unmute qilindi!`);
    } else {
      await ctx.reply("Bu foydalanuvchini mute qilib bo'lmaydi!");
    }
  }
});
