function fadeIn(){

  let hiddenSection = document.querySelector("header.hiddenSection");
  let opacity = 0;
  let interval = setInterval(opacityChanger,10);

  function opacityChanger(){
    if(hiddenSection.style.opacity <= 1){
      opacity = opacity + 0.005;
      hiddenSection.style.opacity = opacity;
    } else {
      clearInterval(interval);
    }
  }
}

function getJoke(){
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function(){
    if(xhttp.readyState === xhttp.DONE && this.status == 200){
      let joke = JSON.parse(xhttp.responseText);
      let jokeParagraph = document.querySelector(".jokeParagraph");

      console.log(joke);
      jokeParagraph.innerHTML = joke.value.joke;
    }
  };

  xhttp.open("GET","http://api.icndb.com/jokes/random",true);
  xhttp.send();
}

function getRepositories(){
  let list = document.querySelector(".list");
  let xhttp = new XMLHttpRequest();
  let repo = (document.querySelector(".search")).value;
  let url = "https://api.github.com/search/repositories?q=" + repo;

  console.log(repo);
  console.log(url);

  xhttp.onreadystatechange = function(){
    if(xhttp.readyState === xhttp.DONE && this.status == 200){
      let repositories = JSON.parse(xhttp.responseText);
      for (i=0; i<repositories.items.length; i++){
        let li = document.createElement("li");
        li.appendChild(document.createTextNode((repositories.items[i]).full_name));
        list.appendChild(li);
      }
    }
  };

  xhttp.open("GET",url,true);
  xhttp.send();
}
