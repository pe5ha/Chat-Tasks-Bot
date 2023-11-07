
// Users sheet structure
let tUsers = {
  sheetName: "Users",
  reg_date_Title: "дата регистрации",
  id_Title: "id",
  nick_Title: "ник",
  name_Title: "имя",
  language_code_Title: "язык",
  current_action_Title: "текущее действие",
  role_Title: "роль",
  phone_Title: "телефон",
  last_action_Title: "последнее действие",
  last_action_time_Title: "время действия",
  total_interactions_Title: "взаимодействий",
  allRange: "A:H",
  getColumnsOrder(){
    return [
      this.reg_date_Title,	
      this.id_Title,	
      this.nick_Title,	
      this.name_Title,	
      this.language_code_Title,
      this.current_action_Title, 
      this.role_Title,
      this.phone_Title,
      this.last_action_Title,
      this.last_action_time_Title,
      this.total_interactions_Title,
    ];
  },
  getCol(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle);
  },
  use(){
    let sheet = table.getSheetByName(this.sheetName);
    if(sheet == null) { // если такого листа нет
      sheet = table.insertSheet(this.sheetName); // то такой лист создаётся
      let style = SpreadsheetApp.newTextStyle().setBold(true).setItalic(true).build();
      this.use().getRange(1,1,1,this.getColumnsOrder().length).setValues([this.getColumnsOrder()]).setTextStyle(style).setHorizontalAlignment("center");
      try {
        this.use().deleteRows(3,995);
      } catch (error) {}
    }
    return sheet;
  }
}

// Logs sheet structure
let LogSheet = {
  SheetName: "Log",
  time_Title: "время",
  id_Title: "id",
  nick_Title: "ник",
  name_Title: "имя",
  message_id_Title: "message id",
  action_Title: "действие",
  what_was_sent_Title: "что прислал",
  bot_answer_Title: "ответ бота",
  getColumnsOrder(){
    return [this.time_Title,	this.id_Title,	this.nick_Title,	this.name_Title,	this.message_id_Title, this.action_Title,this.what_was_sent_Title,this.bot_answer_Title];
  },
  getCol(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle);
  }
}

// Debug sheet structure
let DebugSheet = {
  SheetName: "Debug",
}
