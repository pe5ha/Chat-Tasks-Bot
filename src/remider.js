function showAllTasks(chatId){

  let taskToRemid = remidInChat(chatId, "all");
    
  let mes = "Все установленные задачи:\n\n";
  let keyboard = {
    inline_keyboard: [[]] }
  let k = 0;

  for (let i = 0; i < taskToRemid.length; i++) {
    mes += (i+1) + ". " + taskToRemid[i].title+"\n";
    keyboard.inline_keyboard[k].push({text: (i+1)+"", callback_data: "done "+(i+1)+" "+taskToRemid[i].id});
    if(Math.floor(i/7) > k){
      k++;
      keyboard.inline_keyboard.push([]);
    }
  }

  botSendMessage(chatId,mes,keyboard);


}

let daysInd = ["вс","пн","вт","ср","чт","пт","сб"];


function dailyTaskRemider(){
  let chats = tChats.use().getRange(tChats.ids_Range).getValues();

  for(let j=0; j<chats.length;j++){
    let chatId = chats[j][tChats.getCol(tChats.id_Title)];
    if(chatId == "") break;
    let taskToRemid = remidInChat(chatId, "daily");
      
    let mes = "Ежедневные задачи:\n\n";
    let keyboard = {
      inline_keyboard: [[]] }
    let k = 0;

    for (let i = 0; i < taskToRemid.length; i++) {
      mes += (i+1) + ". " + taskToRemid[i].title+"\n";
      keyboard.inline_keyboard[k].push({text: (i+1)+"", callback_data: "done "+(i+1)+" "+taskToRemid[i].id});
      if(Math.floor(i/7) > k){
        k++;
        keyboard.inline_keyboard.push([]);
      }
    }
    if(taskToRemid.length == 0) return;

    botSendMessage(chatId,mes,keyboard);

  }
}

function weeklyTaskRemider(){
  let chats = tChats.use().getRange(tChats.ids_Range).getValues();


  for(let j=0; j<chats.length;j++){
    let chatId = chats[j][tChats.getCol(tChats.id_Title)];
    if(chatId == "") break;
    let taskToRemid = remidInChat(chatId, "weekly");
      
    let mes = "Еженедельные задачи:\n\n";
    let keyboard = {
      inline_keyboard: [[]] }
    let k = 0;

    for (let i = 0; i < taskToRemid.length; i++) {
      mes += (i+1) + ". " + taskToRemid[i].title+"\n";
      keyboard.inline_keyboard[k].push({text: (i+1)+"", callback_data: "done "+(i+1)+" "+taskToRemid[i].id});
      if(Math.floor(i/7) > k){
        k++;
        keyboard.inline_keyboard.push([]);
      }
    }
    if(taskToRemid.length == 0) return;

    botSendMessage(chatId,mes,keyboard);

  }
}

function onceTaskRemider(){
  let chats = tChats.use().getRange(tChats.ids_Range).getValues();

  for(let j=0; j<chats.length;j++){
    let chatId = chats[j][tChats.getCol(tChats.id_Title)];
    if(chatId == "") break;
    let taskToRemid = remidInChat(chatId, "once");
      
    let mes = "Разовые задачи:\n\n";
    let keyboard = {
      inline_keyboard: [[]] }
    let k = 0;

    for (let i = 0; i < taskToRemid.length; i++) {
      mes += (i+1) + ". " + taskToRemid[i].title+"\n";
      keyboard.inline_keyboard[k].push({text: (i+1)+"", callback_data: "done "+(i+1)+" "+taskToRemid[i].id});
      if(Math.floor(i/7) > k){
        k++;
        keyboard.inline_keyboard.push([]);
      }
    }
    if(taskToRemid.length == 0) return;

    botSendMessage(chatId,mes,keyboard);

  }
}


function remidInChat(chatId, type){
  let tasks = tChat.use(chatId).getRange(tChat.allRange).getValues();
  let taskToRemid = [];
  for (let i = 0; i < tasks.length; i++) {
    if(tasks[i][tChat.getCol(tChat.id_Title)] == "") break;
    let timeOptions;
    try {
      timeOptions = JSON.parse(tasks[i][tChat.getCol(tChat.options_Title)]);
    } catch (e) {
      continue;
    }
    if(type != "all" && timeOptions.type != type) continue;

    let from = timeOptions.fromDate.split(".");
    let date = new Date(from[2],from[1]-1,from[0]);
    if(date > new Date()) continue; // не уведомлять о будущих
    if (timeOptions.repeatDays){
      let days = timeOptions.repeatDays;
      let today = daysInd[new Date().getDay()];
      if(!String(days).includes(today)) continue; // не уведомлять о задачах не сегодняшнего дня
    }
    taskToRemid.push({id: tasks[i][tChat.getCol(tChat.id_Title)], title: tasks[i][tChat.getCol(tChat.name_Title)]});
    // TODO: каждые N дней / каждые N недель по х дням / каждый первый Y день месяца 
    // if (timeOptions.everyWeek){
    //   // let curWeek = new Date().getWeek; 
    // }

  }
  return taskToRemid;
}




