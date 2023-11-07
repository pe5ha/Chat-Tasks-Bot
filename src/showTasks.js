
function sendChatTasks(chatId){
  let tasks = tChat.use(chatId).getRange(tChat.allRange).getValues();
  let taskToRemid = [];
  for (let i = 0; i < tasks.length; i++) {
    if(tasks[i][tChat.getCol(tChat.id_Title)] == "") break;
    if(tasks[i][tChat.getCol(tChat.status_Title)] == "готово") continue;
    let timeOptions;
    try {
      timeOptions = JSON.parse(tasks[i][tChat.getCol(tChat.options_Title)]);
    } catch (e) {
      continue;
    }
    

    let from = timeOptions.fromDate.split(".");
    let date = new Date(from[2],from[1]-1,from[0]);
    if(date > new Date()) continue; // не уведомлять о будущих
    if (timeOptions.repeatDays){
      let days = timeOptions.repeatDays;
      let today = daysInd[new Date().getDay()];
      if(!String(days).includes(today)) continue;
      taskToRemid.push({id: tasks[i][tChat.getCol(tChat.id_Title)], title: tasks[i][tChat.getCol(tChat.name_Title)]});
    }
    
    // TODO: каждые N дней / каждые N недель по х дням / каждый первый Y день месяца 
    // if (timeOptions.everyWeek){
    //   // let curWeek = new Date().getWeek; 
    // }

  }
  let mes = "Уведомление о задачах:\n\n";
  let keyboard = {
    inline_keyboard: [
      []
    ]
  }
  let k = 0;

  for (let i = 0; i < taskToRemid.length; i++) {
    mes += (i+1) + ". " + taskToRemid[i].title+"\n";
    keyboard.inline_keyboard[k].push({text: (i+1)+"", callback_data: "done "+(i+1)+" "+taskToRemid[i].id});
    if(Math.floor(i/7) > k){
      k++;
      keyboard.inline_keyboard.push([]);
    }
  }

  botSendMessage(chat_id,mes,keyboard);

}