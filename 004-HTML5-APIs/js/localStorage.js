let showedKeys = 1

class Text {
  constructor (text){
    this.text = text;
  }
};

function openDataBase(){

  if (typeof(Storage) !== "undefined") {
    if(!localStorage.getItem('KeyCount')){
      localStorage.setItem('KeyCount',1);
      showedKeys = 1;
    }
    else {
      showedKeys = 1;
      listEntries();
    }
  }
  else {
    alert("Sorry, this web page dosen't suport Web Sotrage");
  }
};

function addTextFromPage() {

  let list = document.querySelector(".textList");
  let textArea = document.querySelector(".textEntry");
  key = localStorage.getItem('KeyCount');

  let text = textArea.value;

  console.log("Insertion in DB successful");
  let li = document.createElement("li");

  localStorage.setItem(key,text);
  localStorage.setItem('KeyCount',parseInt(key)+1);

  li.appendChild(document.createTextNode(showedKeys + " Text - Text Preview   \"" + text.slice(0,8) + "...\""));
  list.appendChild(li);
  showedKeys = showedKeys+1;

};


function addTextFromFile(text) {

  let list = document.querySelector(".textList");
  key = localStorage.getItem('KeyCount');

  console.log("Insertion in DB successful");
  let li = document.createElement("li");

  localStorage.setItem(key,text);
  localStorage.setItem('KeyCount',parseInt(key)+1);

  li.appendChild(document.createTextNode(showedKeys + " Text - Text Preview   \"" + obj.text.slice(0,8) + "...\""));
  list.appendChild(li);

  showedKeys = showedKeys+1;
}

function listEntries(){
  let list = document.querySelector(".textList");
  key =  localStorage.getItem('KeyCount');

  for(let i=1; i<parseInt(key); i++){
    let li = document.createElement("li");
    let text = localStorage.getItem(i.toString());

    li.appendChild(document.createTextNode(showedKeys + " Text - Text Preview   \"" + text.slice(0,8) + "...\""));
    list.appendChild(li);
    showedKeys=showedKeys+1;
  }
};

function emptyList(){
  let myNode = document.querySelector(".textList");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

function deleteEntries(){
  localStorage.clear();

  localStorage.setItem('KeyCount',1);
  showedKeys = 1;

  emptyList();
}

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
