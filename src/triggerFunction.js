/**
 * 
 * @param {GoogleAppsScript.Events.TimeDriven} e 
 */
function triggerFunction(e){
  logDebug(e);
  deleteTrigger(e.triggerUid);
  let triggers =  tTriggers.use().getRange(tTriggers.allRange).getValues();
  
  let row = findRowIn2dRangeString(triggers,0,e.triggerUid);
  if(row == -1) return;
  let params = JSON.parse(triggers[row][tTriggers.getCol(tTriggers.parametrs_Title)]);

  for (let i = 0; i < params.length; i++) {
    const chat = params[i];
    sendNotifyToChat(chat);
  }

  tTriggers.use().deleteRow(row+1);
  // триггеры пока только на одноразовые задачи!
}


function debugTrigger(){
  let tDebug = table.getSheetByName("Debug");
  let e = tDebug.getRange('D1').getValue();
  triggerFunction(JSON.parse(e));
  // d
}
/**
 * 
 * @param {Object} param 
 * @param {*} param.chat_id
 * @param {*} param.task_ids
 */
function sendNotifyToChat(param){

  let tasks = tChat.use(param.chat_id).getRange(tChat.allRange).getValues();
  let taskToRemid = [];
  for (let i = 0; i < param.task_ids.length; i++) {
    const task_id = param.task_ids[i];
    let row = findRowIn2dRange(tasks,tChat.getCol(tChat.id_Title),task_id);
    if(row == -1) continue;
    taskToRemid.push({id: task_id, title: tasks[row][tChat.getCol(tChat.name_Title)]});
  }

  let mes = "Уведомление о задачах:\n\n";
  let keyboard = { inline_keyboard: [[]] };
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

  try {
    botSendMessage(param.chat_id,mes,keyboard);
  } catch (error) {
    
  }
}


function deleteTrigger(triggerId) {
  // Loop over all triggers.
  const allTriggers = ScriptApp.getProjectTriggers();
  for (let index = 0; index < allTriggers.length; index++) {
    // If the current trigger is the correct one, delete it.
    if (allTriggers[index].getUniqueId() === triggerId) {
      ScriptApp.deleteTrigger(allTriggers[index]);
      break;
    }
  }
}