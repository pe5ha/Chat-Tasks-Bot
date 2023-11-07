function buttonsUseCases(data){
  if (data == user.lastAction && typeof user.lastActionTime.getMonth === 'function'){
    let lastButtonTime = user.lastActionTime;
    let now = new Date()
    let diffMs = now.getTime() - lastButtonTime.getTime();
    if(diffMs < 1000*3) return;
  }


  if(String(data).startsWith("done ")){
    let nomer = data.split(" ")[1];
    let task_id = data.split(" ")[2];
    let tasks = tChat.use(chat_id).getRange(tChat.allRange).getValues();
    let row = findRowIn2dRangeString(tasks, tChat.getCol(tChat.id_Title), task_id);
    // if(status != "готово"){
      tDoneChat.use(chat_id+"_done").insertRowBefore(2);
      let values = [message_id,task_id,tasks[row][tChat.getCol(tChat.name_Title)], nick ? nick : name, new Date()];
      tDoneChat.use(chat_id+"_done").getRange(2,1,1,values.length).setValues([values]);
      botEditMessage(chat_id,message_id,text.replace("\n"+nomer+". ","\n"+nomer+". (✅) "),reply_markup);
    // }
    // else{
    //   // tChat.use(chat_id+"_done").getRange(row+1,tChat.getCol(tChat.status_Title)+1,1,2).setValues([["", ""]]);
    //   botEditMessage(chat_id,message_id,text.replace("\n"+nomer+". (✅) ","\n"+nomer+". "),reply_markup);
    // }


  }
  // else if(String(data).startsWith("undone ")){
  //   let nomer = data.split(" ")[1];
  //   let task_id = data.split(" ")[2];
  //   let tasks = tChat.use(chatId).getRange(tChat.allRange).getValues();
  //   let row = findRowIn2dRangeString(tasks, tChat.getCol(tChat.id_Title), task_id);
  //   tChat.use(chatId).getRange(row+1,tChat.getCol(tChat.status_Title),1,2).setValues([["", ""]]);
  //   botEditMessage(chat_id,message_id,text.replace("\n"+nomer+". (✅) ","\n"+nomer+". "),reply_markup);
  // }

  else if(data == "oldproject"){
    botDeleteMessage(chat_id,message_id);
  }
  else if(data == "newproject"){
    newProject();
  }
  else if(String(data).startsWith("addproject=")){
    addToProject(data.split("=")[1]);
  }
  else if(String(data).startsWith("remproject=")){
    remProject(data.split("=")[1]);
  }
  else if(data == "launch"){
    launchProject();
  }

  
  user.setUserLastAction(data);
  user.setUserLastActionTime(new Date());
}