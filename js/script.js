let dataBase;
let request = window.indexedDB.open("MyTestDatabase", 3);

request.onerror = function(event){
  console.log(event);
  alert("There has been an error in indexedDB, error code: " + event.target.errorCode);
};

request.onsuccess = function(event){
  db = request.result;
};
