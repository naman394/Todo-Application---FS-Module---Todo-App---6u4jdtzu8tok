const {appendFileSync: AFS, readFileSync: RFS, writeFileSync:WFS} = require('fs'); 
const getTodosSync = () => {   return RFS('./db.txt', 'utf8') };
const convertStringtoJson = (item) => {   
  return JSON.parse(`[${item.split('\n}{').join('},{')}]`); 
} 
const getTodoSync = (id) => {   
  let k = convertStringtoJson(getTodosSync())   
  for (let i of k){     
    if ((i.id) == id){       
      return (JSON.stringify(i))     
    }   
  } 
};  
const createTodoSync = (todo) => {   
  let obj = {     
    "id" :  Date.now(),     
    "title" : todo,     
    "isCompleted": false,     
    "createdAt": new Date().toISOString(),     
    "updatedAt": new Date().toISOString()   
  }   
  AFS('./db.txt', JSON.stringify(obj,null,2)) 
}; 
const updateTodoSync = (id, updates) => {   
  let todos = convertStringtoJson(getTodosSync());   
  const index = todos.findIndex(todo => todo.id == id);   
  let s = "";   
  if (index !== -1) {     
    todos[index] = {...todos[index],...updates,updatedAt: new Date().toISOString()};     
    for (let i of todos){       
      s += JSON.stringify(i, null, 2);     
    }     
    WFS('./db.txt', s, 'utf8');   
  }; 
}  
const deleteTodoSync = (id) => {   
  let todos = convertStringtoJson(getTodosSync());      
  const initialLength = todos.length;   todos = todos.filter(todo => todo.id != id);   
  let s = "";   
  if (todos.length < initialLength) {     
    for (let i of todos){       
      s += JSON.stringify(i, null, 2);     
    }     
    WFS('./db.txt', s, 'utf8');   
  } 
};

module.exports = {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
};