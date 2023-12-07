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
    doneTask(nomer, task_id);
  }

  else if(String(data).startsWith("settings ")){
    let nomer = data.split(" ")[1];
    let task_id = data.split(" ")[2];
    taskSettingsView(task_id);
  }

  else if(String(data).startsWith("back=")){
    botDeleteMessage(chat_id, message_id);
  }
  

  else if(String(data) == "update"){
    showAllTasks(chat_id,true);
  }

  else if(String(data).startsWith("archive=")){
    lettask_id = data.split("=")[1];
    archiveTask(task_id);
  }


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