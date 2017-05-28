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
      for (let i=0; i < repositories.items.length; i++){
        let li = document.createElement("li");
        li.appendChild(document.createTextNode((repositories.items[i]).full_name));
        list.appendChild(li);
      }
    }
  }

  xhttp.open("GET",url,true);
  xhttp.send();
}


function makePromise(url){
	return new Promise( function(resolve, reject) {
		let xhttp = new XMLHttpRequest();

		xhttp.open("GET", url);

		xhttp.onload = function() {
			if (this.readyState == 4 && this.status == 200) {
				let obj = JSON.parse(xhttp.responseText);
				resolve(console.log(obj));
			} else {
				document.querySelector("section").style.backgroundColor="red";
				reject(Error(xhttp.statusText));
			}
		}

		xhttp.send();
	});
}

function tableCreator(matrix){
  let body = document.querySelector(".container");
  let table = document.createElement("table");

  console.log(matrix);

  for(let i=0; i < matrix.length; i++){
    let row = document.createElement("tr");
    console.log(matrix[i]);

    for(let j=0; j < matrix[i].length; j++){
      console.log(matrix[i][j]);
      let cell = document.createElement("td");
      let text = document.createTextNode(matrix[i][j]);

      cell.appendChild(text);
      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  body.appendChild(table);

}
