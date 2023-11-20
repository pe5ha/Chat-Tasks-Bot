let tTriggers = {
  sheetName: "Triggers",
  id_Title: "trigger_id",
  time_Title: "time",
  parametrs_Title: "param",
  allRange: "A:C",
  ids_Range: "A2:A",
  getColumnsOrder(){
    return [
      this.id_Title,	
      this.time_Title,
      this.parametrs_Title,
    ];
  },
  getCol(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle);
  },
  use(){
    let sheet = table.getSheetByName(this.sheetName);
    if(sheet == null) { // если такого листа нет
      table.insertSheet(this.sheetName); // то такой лист создаётся
      let style = SpreadsheetApp.newTextStyle().setBold(true).setItalic(true).build();
      this.use().getRange(1,1,1,this.getColumnsOrder().length).setValues([this.getColumnsOrder()]).setTextStyle(style).setHorizontalAlignment("center");
      try {
        this.use().deleteRows(3,995);
      } catch (error) {}
      sheet = table.getSheetByName(this.sheetName);
    }
    return sheet;
  }
}
