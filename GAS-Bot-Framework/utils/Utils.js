
function stringDate(timestamp=null, beOnlyDate=false, gmt="GMT+3"){
  if(beOnlyDate){
    if(timestamp) return Utilities.formatDate(new Date(timestamp), gmt, "dd.MM.yyyy");
    else return Utilities.formatDate(new Date(), gmt, "dd.MM.yyyy");
  }
  else {
    if(timestamp) return Utilities.formatDate(new Date(timestamp), gmt, "dd.MM.yyyy HH:mm:ss");
    else return Utilities.formatDate(new Date(), gmt, "dd.MM.yyyy HH:mm:ss");
  }
}

function stringDateV2(date, beOnlyDate=false, gmt="GMT+3"){
  if(beOnlyDate){
    return Utilities.formatDate(date, gmt, "dd.MM.yyyy");
  }
  else {
    return Utilities.formatDate(date, gmt, "dd.MM.yyyy HH:mm:ss");
  }
}
function stringDateDash(date,beOnlyDate=false, gmt="GMT+3"){
  if(beOnlyDate){
    return Utilities.formatDate(date, gmt, "yyyy-MM-dd");
  }
  else {
    // return Utilities.formatDate(date, gmt, "yyyy-MM-dd HH:mm:ss");
  }
}

/**
 * date in format: dd.mm.yyyy
 * @param {String} dateString
 */
function getDateFromString(dateString){
  let parts = dateString.split(".");
  return new Date(parts[2],parts[1]-1,parts[0]);
}

function getMonthNameByDate(date){
  return monthNames[date.getMonth()];
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getFirstEmptyRow(range){
  let data = range.getValues();
  for(let i=0;i<data.length;i++){
    if(data[i][0]==="") return i+1;
  }
  return -1;
}

function getFirstEmptyRowInAA(sheet){
  let data = sheet.getRange("A:A").getValues();
  for(let i=0;i<data.length;i++){
    if(data[i][0]==="") return i+1;
  }
  sheet.insertRowAfter(sheet.getLastRow());
  return sheet.getLastRow()+1;
}

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function findRowIn2dRange(array,columnIndex,value){
  for (let i = 0; i < array.length; i++) { 
    if (array[i][columnIndex] == value) {
      return i;
    }
  }
  return -1;
}

function findRowIn2dRangeString(array,columnIndex,value){
  for (let i = 0; i < array.length; i++) { 
    if (String(array[i][columnIndex]) == String(value)) {
      return i;
    }
  }
  return -1;
}

/**
 * 
 * @param {*} array 
 * @param {*} columnIndex 
 * @param {Date} date 
 * @returns 
 */
function findRowIn2dRangeDate(array,columnIndex,date){
  for (let i = 0; i < array.length; i++) { 
    const element = array[i];
    try {
      if(element[columnIndex].getTime() === date.getTime()){
        return i;
      }
    } catch (error) {}
  }
  return -1;
}


function findIndexInObjArau(array,field,value){
  for (let i = 0; i < array.length; i++) { 
    if (array[i][field] == value) {
      return i;
    }
  }
  return -1;
}

/**
 * cut array to first appearence empty row in column
 * @param {Array} array 
 * @param {Int} column zero based column to
 * @returns cutted array
 */
function trim2dArray(array, column=0){
  for (let i = 0; i < array.length; i++) { 
    if (String(array[i][column]) == "") {
      return array.slice(0,i);
    }
  }
}

