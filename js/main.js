const API_KEY = "5d758a4f";
const URL = "https://www.omdbapi.com/";
const URL_POSTER = "http://img.omdbapi.com/";

const move = document.querySelector('.move');



const button = document.getElementById('send')
const input = document.getElementById('search');

const sSearch = document.querySelector('.all');
const h2 = document.querySelector('.searchMovie div h2');
const img = document.querySelector('.searchMovie div img');
const aLi = document.querySelectorAll('.searchMovie div ul li');
const liSinop = aLi[0];
const liActors = aLi[1];
const liGenre = aLi[2];
const liDir = aLi[3];
const liYear = aLi[4];
const liLang = aLi[5];
const liWebSite = aLi[6];

const sScore =document.querySelectorAll('.searchMovie div span')[0];
const sType =document.querySelectorAll('.searchMovie div span')[1];

const home = document.querySelectorAll('#barra li')[0];
const fav = document.querySelectorAll('#barra li')[1];
const trailers = document.querySelectorAll('#barra li')[2];

const buttonAdd = document.querySelector('.add');
const buttonDelete = document.querySelector('.delete');

const sFavorites = document.getElementById('favorites');
const pFavorites = document.querySelector('#favorites p');


/**
 * Listen  event 'click' and execute the function with the fetch
 * then erase the value from the input
 */
button.addEventListener('click', ()=>{

    searchByTitle(input.value);
    input.value = '';

})

function searchByTitle(title){

    fetch(`${URL}?apikey=${API_KEY}&s=${title}&r=json&type=movie`)
        .then(response =>{

            return response.json();

        }).then(responseJson => {

            searchAllData(responseJson);
    });

}

function searchAllData(movies){


    for(var i = 0; i < movies.Search.length; i++){


        fetch(`${URL}?apikey=${API_KEY}&t=${movies.Search[i].Title}&r=json&plot=full`)
            .then(response =>{

                return response.json();

            }).then(responseJson => {

            printData(responseJson);
        });
    }
}

function printData(data){

    console.log(data);
        let article = document.createElement('article');
        article.id = data.imdbID;
        article.className = 'searchMovie';
        article.style.display = 'flex';

        sSearch.append(article);

        let div = document.createElement('div');
        article.append(div);

        let spanScore = document.createElement('span');
        spanScore.innerHTML = 'Score: ' + data.imdbRating;

        div.append(spanScore);
        div.className = 'score';

        let div1 = document.createElement('div');
        article.append(div1);

        let img = document.createElement('img');
        img.src = data.Poster;
        img.alt = 'Poster';
        div1.append(img);

        let div2 = document.createElement('div');
        article.append(div2);

        let h3 = document.createElement('h3');
        h3.innerHTML = data.Title;

        let ul = document.createElement('ul');

        let buttonadd = document.createElement('button');
        buttonadd.innerHTML = 'Agregar a favoritos';
        buttonadd.className = 'add';
        buttonadd.type= 'button';

        let buttonDetails = document.createElement('button');
        buttonDetails.innerHTML = 'Ver detalles';
        buttonDetails.className = 'detail';
        buttonDetails.type= 'button';

        let buttondel = document.createElement('button');
        buttondel.innerHTML = 'Quitar de favoritos';
        buttondel.className = 'delete';
        buttondel.type= 'button';

        div2.append(h3, ul, buttonDetails, buttonadd, buttondel);

        let sinop = document.createElement('li');
        sinop.innerHTML = 'Sinopsis: '+ data.Plot;

        let act = document.createElement('li');
        act.innerHTML = 'Actores: '+ data.Actors;

        let gen = document.createElement('li');
        gen.innerHTML = 'Género: ' + data.Genre;

        let dir = document.createElement('li');
        dir.innerHTML = 'Director: ' + data.Director;

        let year = document.createElement('li');
        year.innerHTML = 'Año: ' + data.Year;

        let lan = document.createElement('li');
        lan.innerHTML = 'Lenguajes: ' + data.Language;

        let ws = document.createElement('li');
        ws.innerHTML = 'WebSite: ' + data.Website;

        ul.append(sinop, act, gen, dir, year, lan, ws);

        //buttonDisplay();



}

/*INDEXED DB*/
/*
var db;


function init(){
    db = new Dexie("favorite-movies");

    db.version(1).stores({ movies: '_id'});

    db.open()
        .then(refreshView);
}

buttonAdd.addEventListener("click", function (event){
    event.preventDefault();

    addFavorite();

    buttonDisplay();
});

/**
 * Method to add movies/series to a list of favorites
 * @param {*} event Event 'click' from the buttom 'add to favorites'
 */


/*
function addFavorite(){


    db.movies.bulkPut([
        {
            _id: article.id,
            title: h2.innerHTML,
            poster: img.src,
            plot: liSinop.innerHTML,
            actors: liActors.innerHTML,
            genre: liGenre.innerHTML,
            director: liDir.innerHTML,
            year: liYear.innerHTML,
            language: liLang.innerHTML,
            website: liWebSite.innerHTML,
            score: sScore.innerHTML,
            type: sType.innerHTML,
        },

    ]).catch(err => {

        alert("Ha ocurrido un error: " + err);

    });


}

window.onload = function(){
    init();
}

function refreshView(){
    return db.movies.toArray()
        .then(printMovies);
}

function printMovies(movies){
    pFavorites.style.display= 'none';

    movies.forEach(function(movie){

        let article = document.createElement('article');
        article.id = movie._id;
        sFavorites.append(article);

        let div1 = document.createElement('div');
        article.append(div1);

        let img = document.createElement('img');
        img.src = movie.poster;
        img.alt = 'Poster';
        div1.append(img);

        let div2 = document.createElement('div');
        article.append(div2);

        let h3 = document.createElement('h3');
        h3.innerHTML = movie.title;

        let spanScore = document.createElement('span');
        spanScore.innerHTML = movie.score;

        let spanType = document.createElement('span');
        spanType.innerHTML = movie.type;

        let ul = document.createElement('ul');

        let button = document.createElement('button');
        button.innerHTML = 'Quitar de favoritos';
        button.className = 'deleteFav';
        button.type= 'button';
        console.log(button);

        div2.append(h3, spanScore, spanType, ul, button);

        let sinop = document.createElement('li');
        sinop.innerHTML = movie.plot;

        let act = document.createElement('li');
        act.innerHTML = movie.actors;

        let gen = document.createElement('li');
        gen.innerHTML = movie.genre;

        let dir = document.createElement('li');
        dir.innerHTML = movie.director;

        let year = document.createElement('li');
        year.innerHTML = movie.year;

        let lan = document.createElement('li');
        lan.innerHTML = movie.language;

        let ws = document.createElement('li');
        ws.innerHTML = movie.website;

        ul.append(sinop, act, gen, dir, year, lan, ws);

        /*let postercillo = movie.poster.slice(-3);

        if(postercillo !== 'N/A'){

            let img = document.createElement('img');
            img.src = movie.poster;
            img.alt = 'Poster';

            article.insertBefore(img, ul);
        }
    });
}*/
/*
fav.addEventListener('click', ()=>{

    move.style.display = 'none';
    article.style.display = 'none';
    sFavorites.style.display = 'block';
});

function buttonDisplay(){
    db.movies.toArray()
        .then(movies =>{
            movies.forEach(function(movie){
                if(article.id === movie._id){

                    buttonAdd.style.display = 'none';
                    buttonDelete.style.display = 'block';
                }else{
                    buttonAdd.style.display = 'block';
                    buttonDelete.style.display = 'none';                }
            })
        });

}

buttonDelete.addEventListener('click', (event)=>{
    var id;

    if (event.target.parentNode.parentNode.hasAttribute('id')){
        // Prevengo el comportamiento default del click del boton
        event.preventDefault();

        // Cual es el ID a borrar?
        id = event.target.parentNode.parentNode.getAttribute("id");

        db.movies.where('_id').equals(id).delete()
            .then(refreshView);
        buttonAdd.style.display = 'block';
        buttonDelete.style.display = 'none';
    }

});

home.addEventListener('click', ()=>{

    if(sFavorites.style.display !== 'none') {
        //|| trailers.style.display !== 'none')
        sFavorites.style.display = 'none';
        //trailers.style.display = 'none';
    }

    move.style.display = 'block';

})

const divOnline = document.getElementById('online')
const circleOnline = document.querySelector('#online span:first-of-type');
const textOnline = document.querySelector('#online span:last-of-type');

window.addEventListener('online', event =>{
    divOnline.className = 'online';
    textOnline.innerHTML = 'Online';

});

window.addEventListener('offline', event =>{

    divOnline.className = 'offline';
    textOnline.innerHTML = 'Offline';
});

if(!navigator.online){
    divOnline.className = 'online';
    textOnline.innerHTML = 'Online';
}*/