function newTask(){
  let task_id = message_id;
  let task = String(text).replace("/+","").split("\n")[0].trim();
  let taskWithMention = task.replace(/@=/g,"@");
  let optionsRaw = "";
  if(text.indexOf("\n") != -1) optionsRaw = String(text).substring(text.indexOf("\n")+1);
  let options = parseDateTimeOptions(optionsRaw);
  tChat.use(chat_id).insertRowBefore(2);
  tChat.use(chat_id).getRange(2,tChat.getCol(tChat.id_Title)+1,1,3).setValues([[task_id, taskWithMention, JSON.stringify(options, null, 5)]]); 
  
  createTriggerForRemider(chat_id,task_id,options);

  let mes = "<b>Задача</b>\n"+task;
  mes += "\n\n<b>Настройки уведомлений</b>\nДата начала: " + options.fromDate;
  mes += "\nВремя: " + options.time;
  mes += "\nТип: " + types[options.type];
  if(options.repeatDays) mes += "\nДни: " + options.repeatDays;
  // let settingsKeyboard = {
  //   inline_keyboard: [
  //     [
  //       // {text: "Редактировать", callback_data: "edit"},
  //     {text: "Удалить", callback_data: "archive=task_id"}],
  //   ]
  // };
  botSendMessage(chat_id,mes);
}
let types = {
  once: "Разовая",
  weekly: "Повторяющаяся",
  daily: "Повторяющаяся",
}

function parseDateTimeOptions(optionsRaw){
  let parameters = {};
  

  if(optionsRaw){
    let optionsByLines = String(optionsRaw).split("\n");


    parameters.repeatDays = checkRepeatDays(optionsByLines[0]);
    if(parameters.repeatDays){
      if(optionsByLines.length > 1) checkDateAndTime(parameters,optionsByLines[1]);
    }
    else{
      checkDateAndTime(parameters,optionsByLines[0]);
      if(optionsByLines.length > 1)  parameters.repeatDays = checkRepeatDays(optionsByLines[1]);
    }

    if(parameters.repeatDays) parameters.type = "weekly";
    else parameters.type = "once";
    if(!parameters.fromDate){
      parameters.fromDate = stringDateV2(new Date(), true);
    }
    if(!parameters.time){
      parameters.time = "12:00";
    }
  }
  // если задача вида "/+ задача" - то она ежедневная
  else{
    parameters.fromDate = stringDateV2(new Date(), true);
    parameters.type = "weekly";
    parameters.time = "12:00";
    parameters.repeatDays = "пн вт ср чт пт сб вс";
  }

  
  return parameters;
}

function checkDateAndTime(parameters, dateTimeString){
  let dateAndTime = dateTimeString.split(" ");
  if (dateAndTime.length == 1){
    if(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(dateAndTime[0])) parameters.time = dateAndTime[0];
    else if(/^\d{2}.\d{2}.\d{4}$/.test(dateAndTime[0])) parameters.fromDate = dateAndTime[0];
  }
  else if (dateAndTime.length > 1){
    if(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(dateAndTime[1])) parameters.time = dateAndTime[1];
    if(/^\d{2}.\d{2}.\d{4}$/.test(dateAndTime[0])) parameters.fromDate = dateAndTime[0];

    if(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(dateAndTime[0])) parameters.time = dateAndTime[0];
    if(/^\d{2}.\d{2}.\d{4}$/.test(dateAndTime[1])) parameters.fromDate = dateAndTime[1];
  }
}

function checkRepeatDays(daysString){
  
  let days = daysString.split(" ");
  let chekedDays = "";
  for (let i = 0; i < days.length; i++) {
    days[i] = days[i].trim().toLowerCase();
    if(daysInd.indexOf(days[i]) != -1){
      if(chekedDays) chekedDays += " ";
      chekedDays += days[i];
    }
  }

  return chekedDays;
}
