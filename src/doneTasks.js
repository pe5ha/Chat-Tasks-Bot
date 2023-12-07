

function doneTask(nomer, task_id){
  let tasks = tChat.use(chat_id).getRange(tChat.allRange).getValues();
  let row = findRowIn2dRangeString(tasks, tChat.getCol(tChat.id_Title), task_id);
  let table_row = row + 2;

  let done_row = checkDoneTask(message_id);
  let table_done_row = done_row + 2;
  if(done_row == -1){
    tDoneChat.use(chat_id+"_done").insertRowBefore(2);
    let values = [message_id,task_id,tasks[row][tChat.getCol(tChat.name_Title)], nick ? nick : name, new Date()];
    tDoneChat.use(chat_id+"_done").getRange(2,1,1,values.length).setValues([values]);
    timeOptions = JSON.parse(tasks[row][tChat.getCol(tChat.options_Title)]);
    if(timeOptions.type == "once") {
      tChat.use(chat_id).deleteRow(table_row);
      botEditMessage(chat_id,message_id,text.replace("\n"+nomer+". ","\n"+nomer+". (✅) "));
    }
    else{
      botEditMessage(chat_id,message_id,text.replace("\n"+nomer+". ","\n"+nomer+". (✅) "),reply_markup);
    }
  }
  else{
    tDoneChat.use(chat_id+"_done").deleteRow(table_done_row);
    botEditMessage(chat_id,message_id,text.replace("\n"+nomer+". (✅) ","\n"+nomer+". "),reply_markup);
  }
}

function checkDoneTask(task_done_id){
  let doneTasks = tDoneChat.use(chat_id+"_done").getRange(tDoneChat.allRange).getValues();
  let row = findRowIn2dRangeString(doneTasks,tDoneChat.getCol(tDoneChat.id_Title),task_done_id);
  return row;
}
