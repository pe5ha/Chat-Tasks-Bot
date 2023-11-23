
function taskSettingsView(task_id){
      
  let tasks = tChat.use(chat_id).getRange(tChat.allRange).getValues();
  let row = findRowIn2dRangeString(tasks, tChat.getCol(tChat.id_Title), task_id);
  if(row == -1) {
    showAllTasks(chat_id,true);
    return;
  };
  let mes = "<b>Задача</b>\n"+tasks[row][tChat.getCol(tChat.name_Title)];
  mes += "\n\n<b>Настройки уведомлений</b>\nДата начала: " + options.fromDate;
  mes += "\nВремя: " + options.time;
  mes += "\nТип: " + types[options.type];
  if(options.repeatDays) mes += "\nДни: " + options.repeatDays;
  let settingsKeyboard = {
    inline_keyboard: [
      [
      {text: "Назад", callback_data: "back="},
      {text: "Архивировать", callback_data: "archive="+task_id}],
    ]
  };
  botSendMessage(chat_id,mes,settingsKeyboard);

}



function archiveTask(task_id){
  let tasks = tChat.use(chat_id).getRange(tChat.allRange).getValues();
  let row = findRowIn2dRangeString(tasks, tChat.getCol(tChat.id_Title), task_id);
  if(row == -1) {
    botDeleteMessage(chat_id,message_id);
    return;
  };
  tChat.use(chat_id).deleteRow(row+1);
  botDeleteMessage(chat_id,message_id);

}