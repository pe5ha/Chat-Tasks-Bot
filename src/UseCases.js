/**
 *   Bot use cases detecting (User Roles and Current actions)
 */
function useCases(){
  // start
  if (text.startsWith("/start ")) { 
    let payload = text.split(" ")[1];
    startCommand(payload);
  }
  else if (text == "/start") {
    startCommand();
  }
  
  if(String(text).startsWith("/+")){
    newTask();
  }
  
  else if(text == "/tasks" || String(text).startsWith("/tasks@")){
    showAllTasks(chat_id);
  }
  
  else if(text == "/help" || String(text).startsWith("/help@")){
    sendHelp();
  }


  if(new_chat_member){
    if(new_chat_member.id == token.split(":")[0]){
      botInNewChat();
    }
  }
  

}

function startCommand(payload=null){
  if(user.isNewUser){ // если новый юзер
    // TODO новый юзер
    if(payload){ // реферал
      
    }
    // можно ссылкой выдавать роль
    // if(payload=="giveadmin234324"){
    //   setUserRole(user,UserRoles.admin);
    // }
  }

  // deep link
  if(payload){ 

  }
  // просто /start
  else{
    botSendMessage(chat_id,"Старт");

  }
}