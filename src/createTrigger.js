let remiderFunction = "triggerFunction";

function createTimeDrivenTriggers(functionName, atDate) {
  return ScriptApp.newTrigger(functionName)
      .timeBased()
      .at(atDate)
      .create();
}

function testTrigger(){
  let atDate = new Date(2023,10,13,11,29);
  createTimeDrivenTriggers("forTrigger",atDate);
}

function forTrigger(){
  botSendMessage(235733832,"Trigger");
}

/**
 * 
 * @param {*} chat_id 
 * @param {*} task_id 
 * @param {Object} options 
 * @param {String} options.fromDate
 * @param {String} options.time
 * @param {String} options.type
 * @param {String} [options.repeatDays]
 */
function createTriggerForRemider(chat_id,task_id,options){
  if(options.type != "once") return;
  let triggers =  tTriggers.use().getRange(tTriggers.allRange).getValues();

  let atDate = getDateFromString(options.fromDate);
  atDate.setHours(options.time.split(":")[0]);
  atDate.setMinutes(options.time.split(":")[1]);

  let row = findRowIn2dRangeDate(triggers,1,atDate);
  if(row != -1){
    let newParams = JSON.parse(triggers[row][tTriggers.getCol(tTriggers.parametrs_Title)]);
    let chat_index = findIndexInObjArau(newParams,"chat_id",chat_id);
    if(chat_index != -1){
      newParams[chat_index]["task_ids"].push(task_id);
    }
    else{
      newParams.push({chat_id: chat_id, task_ids: [task_id]});
    }
    tTriggers.use().getRange(row+1,tTriggers.getCol(tTriggers.parametrs_Title)+1).setValue(JSON.stringify(newParams));
    return;
  }

  let trigger_id = createTimeDrivenTriggers(remiderFunction, atDate);
  let params = [];
  params.push({chat_id: chat_id, task_ids: [task_id]});
  tTriggers.use().insertRowBefore(2);
  tTriggers.use().getRange(2,1,1,3).setValues([[trigger_id.getUniqueId(),stringDateV2(atDate),JSON.stringify(params)]]);

}