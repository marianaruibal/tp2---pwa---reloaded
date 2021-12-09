function movie(data){

//console.log(data);
console.log(data.length);
for(var i = 0; i < data.Search.length; i++){

let dato = data.Search[i];

console.log(dato);

let article = document.createElement('article');
article.id = dato.imdbID;
article.className = 'searchMovie';

sSearch.append(article);

let spanScore = document.createElement('span');
spanScore.innerHTML = dato.score;

let spanType = document.createElement('span');
spanType.innerHTML = dato.type;

article.append(spanScore, spanType);

let div1 = document.createElement('div');
article.append(div1);

let img = document.createElement('img');
img.src = dato.poster;
img.alt = 'Poster';
div1.append(img);

let div2 = document.createElement('div');
article.append(div2);

let h3 = document.createElement('h3');
h3.innerHTML = dato.title;

let ul = document.createElement('ul');

let buttonadd = document.createElement('button');
button.innerHTML = 'Agregar a favoritos';
button.className = 'add';
button.type= 'button';

let buttondel = document.createElement('button');
button.innerHTML = 'Quitar de favoritos';
button.className = 'delete';
button.type= 'button';

div2.append(h3, ul, buttonadd, buttondel);

let sinop = document.createElement('li');
sinop.innerHTML = dato.plot;

let act = document.createElement('li');
act.innerHTML = dato.actors;

let gen = document.createElement('li');
gen.innerHTML = dato.genre;

let dir = document.createElement('li');
dir.innerHTML = dato.director;

let year = document.createElement('li');
year.innerHTML = dato.year;

let lan = document.createElement('li');
lan.innerHTML = dato.language;

let ws = document.createElement('li');
ws.innerHTML = dato.website;

ul.append(sinop, act, gen, dir, year, lan, ws);

article.style.display = 'flex';
console.log(dato.imdbID);
article.id = dato.imdbID;
h2.innerHTML = dato.Title;
img.src = dato.Poster;
liSinop.innerHTML = dato.Plot;
liActors.innerHTML = 'Actores: ' + dato.Actors;
liGenre.innerHTML = 'Género: ' + dato.Genre;
liDir.innerHTML = 'Director: ' + dato.Director;
liYear.innerHTML = 'Año: ' + dato.Year;
liLang.innerHTML = 'Lenguaje: ' + dato.Language;
liWebSite.innerHTML = 'Sitio web: ' + dato.Website;

sScore.innerHTML = 'Score: ' + dato.imdbRating;
sType.innerHTML = dato.Type.charAt(0).toUpperCase() + dato.Type.slice(1);

buttonDisplay();
}


}
