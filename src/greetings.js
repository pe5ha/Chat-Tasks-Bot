function botInNewChat(){
  sendHelp();
  let chats = tChats.use().getRange(tChats.ids_Range).getValues();
  if(findRowIn2dRange(chats,0,chat_id) == -1) {
    tChats.use().insertRowBefore(2);
    tChats.use().getRange(2,tChats.getCol(tChats.id_Title)+1,1,2).setValues([[chat_id, chat_title]]);
  }
  // todo greetengs


  let greetMes = "Это новый проект?";
  let greetKeyboard = {
    inline_keyboard: [
      [{text: "Да", callback_data: "newproject"},{text: "Нет", callback_data: "oldproject"},]
    ]
  };

  botSendMessage(chat_id, greetMes, greetKeyboard);

}

function newProject(){
  let choiceMes = "Где запускаемся?";
  let choiceKeyboard = {
    inline_keyboard: [
      [{text: "ВК", callback_data: "addproject=0"},
      {text: "ФБ", callback_data: "addproject=1"},
      {text: "ЯД", callback_data: "addproject=2"},
      {text: "ТГ", callback_data: "addproject=3"}],
      [{text: "Запуск!", callback_data: "launch"}]
    ]
  };
  botEditMessage(chat_id, message_id, choiceMes, choiceKeyboard);
}

function addToProject(ind){
  reply_markup.inline_keyboard[0][ind].text += "✅";
  reply_markup.inline_keyboard[0][ind].callback_data = "remproject="+ind;
  botEditMessage(chat_id,message_id,text,reply_markup);
}

function remProject(ind){
  reply_markup.inline_keyboard[0][ind].text = reply_markup.inline_keyboard[0][ind].text.replace("✅","");
  reply_markup.inline_keyboard[0][ind].callback_data = "addproject="+ind;
  botEditMessage(chat_id,message_id,text,reply_markup);
}


function launchProject(){
  let pools = ["ВК","ФБ","ЯД","ТГ"];
  let taskPools = [];
  for(let i=0;i<reply_markup.inline_keyboard[0].length;i++){
    if(String(reply_markup.inline_keyboard[0][i].text).includes("✅")){
      taskPools.push(pools[i]);
    }
  }
  copyProjects(taskPools);
  let launchMes = "Задачи скопированы!";
  botEditMessage(chat_id,message_id, launchMes);
  showAllTasks(chat_id);
}

function copyProjects(taskPools){
  for (let i = 0; i < taskPools.length; i++) {
    const poolName = taskPools[i];
    let tasks = tChat.use(poolName).getRange(tChat.allRange).getValues();
    tasks = trim2dArray(tasks);
    tChat.use(chat_id).insertRowsBefore(2,tasks.length);
    tChat.use(chat_id).getRange(2,1,tasks.length,tasks[0].length).setValues(tasks);
  }
}