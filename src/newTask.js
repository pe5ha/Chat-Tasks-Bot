function newTask(){
  
  let task = String(text).replace("/+","").split("\n",2)[0].trim();
  let optionsRaw = "";
  if(text.indexOf("\n") != -1) optionsRaw = String(text).substring(text.indexOf("\n")+1);
  let options = parseDateTimeOptions(optionsRaw);
  tChat.use(chat_id).insertRowBefore(2);
  tChat.use(chat_id).getRange(2,tChat.getCol(tChat.id_Title)+1,1,3).setValues([[message_id, task, JSON.stringify(options, null, 5)]]); 
  
  let taskMes = "Добавлена задача: <b>"+task+"</b>";
  taskMes += "\nДата начала: " + options.fromDate;
  taskMes += "\nТип: " + types[options.type];
  if(options.repeatDays) taskMes += "\nДни: " + options.repeatDays;

  botSendMessage(chat_id,taskMes);
}
let types = {
  once: "Разовая",
  weekly: "Еженедельная",
  daily: "Ежедневная",
}

function parseDateTimeOptions(optionsRaw){
  let parameters = {};


  if(optionsRaw){
    let optionsByLines = String(optionsRaw).split("\n");


    let repeatDays = checkRepeatDays(optionsByLines[0]);
    if(repeatDays){
      parameters.repeatDays = repeatDays;
    }
    else{
      let dateAndTime = optionsByLines[0].split(" ");
      if(/^\d{2}.\d{2}.\d{4}$/.test(dateAndTime[0])) parameters.fromDate = dateAndTime[0];
      if (dateAndTime.length > 1){
        if(/^\d{2}:\d{2}$/.test(dateAndTime[1])) parameters.time = dateAndTime[1];
      }
    }


    if(optionsByLines.length > 1){
      let repeatDays = checkRepeatDays(optionsByLines[1]);
      if(repeatDays){
        parameters.repeatDays = repeatDays;
      }
      else{
        let dateAndTime = optionsByLines[1].split(" ");
        if(/^\d{2}.\d{2}.\d{4}$/.test(dateAndTime[0])) parameters.fromDate = dateAndTime[0];
        if (dateAndTime.length > 1){
          if(/^\d{2}:\d{2}$/.test(dateAndTime[1])) parameters.time = dateAndTime[1];
        }
      }
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
    parameters.type = "daily";
    parameters.time = "10:00";
  }

  
  return parameters;
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