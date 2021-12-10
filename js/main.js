const API_KEY = "5d758a4f";
const URL = "https://www.omdbapi.com/";
const URL_POSTER = "http://img.omdbapi.com/";

const button = document.getElementById('send')
const input = document.getElementById('search');

const sSearch = document.querySelector('.all');

const home = document.querySelectorAll('#barra li')[0];
const fav = document.querySelectorAll('#barra li')[1];
const what = document.querySelectorAll('#barra li')[2];

const spinner = document.querySelector('.spinner')

const sFavorites = document.getElementById('favorites');
const pFavorites = document.querySelector('#favorites p');
const sWhattosee = document.getElementById('whattosee');
const pWhattosee = document.querySelector('#whattosee p');

/**
 * Listen  event 'click' and execute the function with the fetch
 * then erase the value from the input
 */
button.addEventListener('click', ()=>{

    searchByTitle(input.value);
    input.value = '';

})

/**
 * Use method fetch to request to the API the data of a movie by the title.
 * @param title
 */
function searchByTitle(title){

    spinner.style.display = 'block';

    fetch(`${URL}?apikey=${API_KEY}&s=${title}&r=json&type=movie`)
        .then(response =>{
            console.log(response.status);
            return response.json();

        }).then(responseJson => {

            searchAllData(responseJson);
    });

}

/**
 * Use method fetch to request to the API the full data of a movie by the title.
 * @param movies
 */
function searchAllData(movies){


    for(var i = 0; i < movies.Search.length; i++){


        fetch(`${URL}?apikey=${API_KEY}&t=${movies.Search[i].Title}&r=json&plot=full`)
            .then(response =>{
                if(response.status === 200){
                    spinner.style.display = 'none';
                }
                return response.json();

            }).then(responseJson => {

            printData(responseJson);
        });
    }
}

/**
 * Generates HTML elements with the data from the request to the API in the home
 * @param data
 */
function printData(data){

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


        let buttondel = document.createElement('button');
        buttondel.innerHTML = 'Quitar de favoritos';
        buttondel.className = 'delete';
        buttondel.type= 'button';

        div2.append(h3, ul, buttonadd, buttondel);

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


}

/*INDEXED DB*/

var db;

function init(){
    db = new Dexie("favorite-movies");

    db.version(1).stores({ movies: '_id'});

    db.open()
        .then(bringDataBase);
}

document.addEventListener("click", function (e){


    if(e.target.className === 'add'){

        e.preventDefault();

        addFavorite(e.target.parentElement.parentElement.id);

        e.target.style.display = 'none';
        e.target.nextElementSibling.style.display = 'block';

        //buttonDisplay();
    }else if(e.target.className === 'delete'){

        if(e.target.parentNode.parentNode.hasAttribute('id')){

            let id = e.target.parentNode.parentNode.getAttribute("id");

            db.movies.where('_id').equals(id).delete();
            e.target.style.display = 'none';
            e.target.previousElementSibling.style.display = 'block';

        }else if(e.target.parentNode.parentNode.className.slice(0,8) == 'favMovie'){

            let id = e.target.parentNode.parentNode.className.slice(-9);

            db.movies.where('_id').equals(id).delete();
            e.target.parentNode.parentNode.remove();
        }
    }

});

var _id, article, h3, img, aLi, liSinop, liActors, liGenre, liDir, liYear, liLang, liWebSite, sScore;
/**
 * Method to add movies/series to a list of favorites
 * @param {*} event Event 'click' from the buttom 'add to favorites'
 */
function addFavorite(id){

     _id = id;
     h3 = document.querySelector('#'+ id + ' div h3');
     img = document.querySelector('#'+ id + ' div img');
     aLi = document.querySelectorAll('#'+ id + ' div ul li');
     liSinop = aLi[0];
     liActors = aLi[1];
     liGenre = aLi[2];
     liDir = aLi[3];
     liYear = aLi[4];
     liLang = aLi[5];
     liWebSite = aLi[6];
     sScore =document.querySelector('#'+ id + ' span');

    db.movies.bulkPut([
        {
            _id: _id,
            title: h3.innerHTML,
            poster: img.src,
            plot: liSinop.innerHTML,
            actors: liActors.innerHTML,
            genre: liGenre.innerHTML,
            director: liDir.innerHTML,
            year: liYear.innerHTML,
            language: liLang.innerHTML,
            website: liWebSite.innerHTML,
            score: sScore.innerHTML,
        },

    ]).catch(err => {

        alert("Ha ocurrido un error: " + err);
    });



}

window.onload = function(){
    init();
}

function bringDataBase(){
    return db.movies.toArray()
        .then(response =>{

            if(response.length == 0){
                pFavorites.style.display = 'block';
                pFavorites.innerHTML = 'No ha seleccionado películas favoritas aún.'
                pWhattosee.style.display = 'block';
                pWhattosee.innerHTML = 'Debe seleccionar alguna película favorita.'

            }else{
                pFavorites.style.display = 'none';
                pWhattosee.innerHTML = 'Nuestra selección para usted es:';
            }
            //console.log(response);
            //buttonDisplay(response);
            printWhatToSee(response);
            printFavorites(response);
        });

}

function printFavorites(movies){

    movies.forEach(function(movie){

        let article = document.createElement('article');
        article.className = 'favMovie ' + movie._id;
        article.style.display = 'flex';

        sFavorites.append(article);

        let div = document.createElement('div');
        article.append(div);

        let spanScore = document.createElement('span');
        spanScore.innerHTML = movie.score;

        div.append(spanScore);
        div.className = 'score';

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

        let ul = document.createElement('ul');

        let buttonadd = document.createElement('button');
        buttonadd.innerHTML = 'Agregar a favoritos';
        buttonadd.className = 'add';
        buttonadd.type= 'button';


        let buttondel = document.createElement('button');
        buttondel.innerHTML = 'Quitar de favoritos';
        buttondel.className = 'delete';
        buttondel.type= 'button';

        div2.append(h3, ul, buttonadd, buttondel);

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
    });
}

function printWhatToSee(movie){

    let random;
    if(movie.length!== 0){

            random = Math.floor(Math.random() * (movie.length - 1));
            console.log(random);
    }

    console.log(movie[random]);

    let article = document.createElement('article');
    article.className = 'what ' + movie[random]._id;
    article.style.display = 'flex';

    sWhattosee.append(article);

    let div = document.createElement('div');
    article.append(div);

    let spanScore = document.createElement('span');
    spanScore.innerHTML = movie[random].score;

    div.append(spanScore);
    div.className = 'score';

    let div1 = document.createElement('div');
    article.append(div1);

    let img = document.createElement('img');
    img.src = movie[random].poster;
    img.alt = 'Poster';
    div1.append(img);

    let div2 = document.createElement('div');
    article.append(div2);

    let h3 = document.createElement('h3');
    h3.innerHTML = movie[random].title;

    let ul = document.createElement('ul');

    div2.append(h3, ul);

    let sinop = document.createElement('li');
    sinop.innerHTML = movie[random].plot;

    let act = document.createElement('li');
    act.innerHTML = movie[random].actors;

    let gen = document.createElement('li');
    gen.innerHTML = movie[random].genre;

    let dir = document.createElement('li');
    dir.innerHTML = movie[random].director;

    let year = document.createElement('li');
    year.innerHTML = movie[random].year;

    let lan = document.createElement('li');
    lan.innerHTML = movie[random].language;

    let ws = document.createElement('li');
    ws.innerHTML = movie[random].website;

    ul.append(sinop, act, gen, dir, year, lan, ws);


}

fav.addEventListener('click', ()=>{

    sSearch.style.display = 'none';
    sFavorites.style.display = 'block';
    sWhattosee.style.display = 'none';
});

/*function buttonDisplay(dataBase){

            dataBase.forEach(function(movie){

                let articles = document.querySelectorAll('.all article');

                let buttonadd, buttondelete;

                for(let i = 0; i < articles.length; i++){
                    buttonadd = articles[i].lastElementChild.lastElementChild.previousElementSibling;
                    buttondelete = articles[i].lastElementChild.lastElementChild;

                    if(articles[i].id == movie._id || articles[i].className == movie._id){
                        console.log('confirmado');
                        //Button .add
                        buttonadd.style.display = 'none';
                        //Button .delete
                        buttondelete.style.display = 'block';
                    }else{
                        console.log('probando');
                        //Button .add
                        articles[i].lastElementChild.lastElementChild.previousElementSibling.style.display = 'block';
                        //Button .delete
                        articles[i].lastElementChild.lastElementChild.style.display = 'none';
                    }
                }

            });

}*/


home.addEventListener('click', ()=>{

    sFavorites.style.display = 'none';
    sSearch.style.display = 'block';
    sWhattosee.style.display = 'none';

})

what.addEventListener('click', ()=>{

    let articles = document.querySelectorAll('#whattosee article')

    if(articles.length == 0){

        bringDataBase();
    }

    sFavorites.style.display = 'none';
    sSearch.style.display = 'none';
    sWhattosee.style.display = 'block';

})


window.addEventListener("offline", (event) => {
    let online = document.getElementById('online')
        online.className = 'offline';
        online.lastElementChild.innerHTML = "Offline"
});

// Escucho si el usuario tiene conexion
window.addEventListener("online", (event) => {

    let online = document.getElementById('online')
    online.className = 'online';
    online.lastElementChild.innerHTML = "Online"
   // document.getElementById("main-container").classList.remove("d-none");
});

