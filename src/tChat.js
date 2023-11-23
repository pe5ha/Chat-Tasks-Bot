let tChat = {
  id_Title: "id задачи",
  name_Title: "задача",
  options_Title: "опции",
  allRange: "A:C",
  ids_Range: "A:A",
  getColumnsOrder(){
    return [
      this.id_Title,	
      this.name_Title,
      this.options_Title,
    ];
  },
  getCol(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle);
  },
  use(sheetName){
    sheetName = String(sheetName);
    let sheet = table.getSheetByName(sheetName);
    if(sheet == null) { // если такого листа нет
      sheet = table.insertSheet(sheetName); // то такой лист создаётся
      let style = SpreadsheetApp.newTextStyle().setBold(true).setItalic(true).build();
      this.use(sheetName).getRange(1,1,1,this.getColumnsOrder().length).setValues([this.getColumnsOrder()]).setTextStyle(style).setHorizontalAlignment("center");
      try {
        this.use(sheetName).deleteRows(3,995);
      } catch (error) {}
    }
    return sheet;
  }
}

let tDoneChat = {
  id_Title: "id выполнения",
  task_id_Title: "id родителя",
  name_Title: "задача",
  who_Title: "кто выполнил",
  date_Title: "дата выполнения",
  allRange: "A:D",
  ids_Range: "A:A",
  getColumnsOrder(){
    return [
      this.id_Title,	
      this.task_id_Title,
      this.name_Title,
      this.who_Title,
      this.date_Title,
    ];
  },
  getCol(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle);
  },
  use(sheetName){
    sheetName = String(sheetName);
    let sheet = table.getSheetByName(sheetName);
    if(sheet == null) { // если такого листа нет
      sheet = table.insertSheet(sheetName); // то такой лист создаётся
      let style = SpreadsheetApp.newTextStyle().setBold(true).setItalic(true).build();
      this.use(sheetName).getRange(1,1,1,this.getColumnsOrder().length).setValues([this.getColumnsOrder()]).setTextStyle(style).setHorizontalAlignment("center");
      try {
        this.use(sheetName).deleteRows(3,995);
      } catch (error) {}
    }
    return sheet;
  }
}
