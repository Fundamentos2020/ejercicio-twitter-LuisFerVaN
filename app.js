//Variables
const listaTweets = document.getElementById("MisTweets");

//Event Listeners
eventListeners();
function eventListeners(){
    //Cuando se envia el formulario
    document.querySelector("#formulario").addEventListener("submit", agregarTweet);

    //Eliminar tweets
    listaTweets.addEventListener("click", eliminarTweet);

    //Contenido cargado desde local storage
    document.addEventListener("DOMContentLoaded", localStorageListo);
}

//Funciones

//Agregar Tweet
//Recordar poner "e" para agregar evento
function agregarTweet(e){
    e.preventDefault();
    //Recuperamos el valor dentro del textArea
    const tweet = document.getElementById("tweet").value;

    //Creamos un boton para eliminar
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrarTweet";
    botonBorrar.innerText = "X";
    
    //Crear elemento y añadirlo a la lista
    const li = document.createElement("li");
    li.classList = "claseLi";
    li.innerText = tweet;
    //Añade boton de borrar
    li.appendChild(botonBorrar);
    //Añade el boton a la lista
    listaTweets.appendChild(li);

    //Añadir a local Storage
    agregarTweetLocalStorage(tweet);
}

//Funcion para eliminar tweets del DOM
function eliminarTweet(e){
    e.preventDefault();
    if(e.target.className ==="borrarTweet"){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }else{
    }
    
}

//Agregar tweet a Local Storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //Añadir el nuevo tweet
    tweets.push(tweet);
    //Convertir de string a arreglo para local Storage
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

//Comprobar que haya elementos en local storage
function obtenerTweetsLocalStorage(){
    let tweets;
    //Revisamos si local storage esta vacio
    if(localStorage.getItem("tweets") === null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem("tweets"));
    }
    return tweets;
}

//Mostrar datos de local storage en la lista
function localStorageListo(){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet){
        const botonBorrar = document.createElement("a");
        botonBorrar.classList = "borrarTweet";
        botonBorrar.innerText = "X";
        const li = document.createElement("li");
        li.innerText = tweet;
        //Añade boton de borrar
        li.appendChild(botonBorrar);
        //Añade el boton a la lista
        listaTweets.appendChild(li);
    });
}

//Eliminar tweet de local storage
function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    //ELimina la letra X
    tweetBorrar = tweet.substring(0, tweet.length - 1);
    tweets = obtenerTweetsLocalStorage();
    //index es la posicion actual
    tweets.forEach(function(tweet, index){
        if(tweet === tweetBorrar){
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem("tweets", JSON.stringify(tweets));
}