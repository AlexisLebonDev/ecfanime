const inputName = document.getElementById("inputName");
const rangeInput = document.getElementById("rangeInput");
const rangeDisplay = document.getElementById("rangeDisplay");
const btnOrdre = document.getElementById("btnOrdre");
const zoneCard = document.querySelector(".zoneCard");

let movies = [];
let sortMethod ;


const fetchMovies = async () =>{
const result = await fetch(`https://api.jikan.moe/v4/anime?q=${inputName.value}`);
data = await result.json();
movies = data.data;

displayMovie();

};


const displayMovie = () =>{
    zoneCard.innerHTML = "";
    movies
    .sort((a,b)=>{
        if(sortMethod === "Croissant") {
            return a.score - b.score;
        }
        if(sortMethod === "Décroissant") {
            return b.score - a.score;
        }
    })
    .slice(0, rangeInput.value)
    .map((movie) => {
    zoneCard.innerHTML += `

    <div class="card">
        <h2>${movie.title}</h2>
        <img src=${movie.images.jpg.image_url} alt="">
        <p class="resume">${movie.synopsis}</p>
        <p>Score: ${movie.score}</p>
        <a href=${movie.trailer.url}>Watch Trailer</a>
    </div>

    `;});

}

fetchMovies();

rangeInput.addEventListener("input", ()=>{
    rangeDisplay.textContent = rangeInput.value;
    displayMovie();
})

inputName.addEventListener("change", () =>{
    fetchMovies();
})

btnOrdre.addEventListener("click", () =>{

    if(sortMethod === "Croissant"){
        btnOrdre.textContent = "Décroissant";
        sortMethod = "Décroissant";
    }
    else {
        btnOrdre.textContent = "Croissant";
        sortMethod = "Croissant";
    }
    displayMovie();
})

