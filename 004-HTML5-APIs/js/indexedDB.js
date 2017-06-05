const DB_STORE_NAME = "textDataBase";

let showedKeys = 1

class Text {
  constructor (text){
    this.text = text;
  }
};

let db;

function openDataBase(){

  let request = indexedDB.open(DB_STORE_NAME, 1);

  request.onerror = function(event){
    console.log(event);
    alert("There has been an error in indexedDB, error code: " + event.target.errorCode);
  };

  request.onsuccess = function (event) {
    db = this.result;
    console.log("openDb DONE");
    listEntries();
  };

  request.onupgradeneeded = function (event) {
      let store = event.currentTarget.result.createObjectStore(
        DB_STORE_NAME, { autoIncrement: true });
  }
};



function addTextFromPage() {

  let list = document.querySelector(".textList");
  let textArea = document.querySelector(".textEntry");

  let obj = new Text(textArea.value);

  let store = db.transaction(DB_STORE_NAME, 'readwrite').objectStore(DB_STORE_NAME);
  let req = store.add(obj);

  req.onsuccess = function (event) {
    console.log("Insertion in DB successful");
    let li = document.createElement("li");

    li.appendChild(document.createTextNode(showedKeys + " Text - Text Preview   \"" + textArea.value.slice(0,8) + "...\""));
    list.appendChild(li);
    showedKeys = showedKeys+1;
  };

  req.onerror = function() {
    alert("There has been an error in indexedDB, error code: " + this.error);
  }
}

function addTextFromFile(text) {

  let list = document.querySelector(".textList");

  let obj = new Text(text);

  let store = db.transaction(DB_STORE_NAME, 'readwrite').objectStore(DB_STORE_NAME);
  let req = store.add(obj);

  req.onsuccess = function (event) {
    console.log("Insertion in DB successful");
    let li = document.createElement("li");

    li.appendChild(document.createTextNode(showedKeys + " Text - Text Preview   \"" + text.slice(0,8) + "...\""));
    list.appendChild(li);
    showedKeys = showedKeys+1;
  };

  req.onerror = function() {
    alert("There has been an error in indexedDB, error code: " + this.error);
  }
}

function listEntries(){
  let objectStore = db.transaction(DB_STORE_NAME,'readonly').objectStore(DB_STORE_NAME);
  let list = document.querySelector(".textList");

  objectStore.openCursor().onsuccess = function(event) {
  let cursor = event.target.result;

  if (cursor) {
      console.log(showedKeys);
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(showedKeys + " Text - Text Preview   \"" + cursor.value.text.slice(0,8) + "...\""));
      list.appendChild(li);
      showedKeys=showedKeys+1
      cursor.continue();
    }
  }
};

function emptyList(){
  let myNode = document.querySelector(".textList");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

function deleteEntries(){
  let objectStore = db.transaction(DB_STORE_NAME,'readonly').objectStore(DB_STORE_NAME);

  objectStore.openCursor().onsuccess = function(event) {
    let cursor = event.target.result;
    if (cursor) {
      request = db.transaction(DB_STORE_NAME, "readwrite").objectStore(DB_STORE_NAME)
                .delete(cursor.key);
      request.onerror = function(event) {
        alert("There has been an error while trying to delete an entrie " + event.target.errorCode);
      };
      request.onsuccess = function(event) {
        console.log("An item has been deleted");
      };
      cursor.continue();
    }
  }

  showedKeys = 1;
  emptyList();
};

function fileLoader(event){
  event.preventDefault();

  let file = event.dataTransfer.files[0];
  let reader = new FileReader();

  reader.onload = function(e){
    addTextFromFile(e.target.result);
  }
  reader.onerror = function(e){
    console.log(e);
  }

  reader.readAsText(file);

  return false;

}

function allowDrop(event){
  event.preventDefault();
}
