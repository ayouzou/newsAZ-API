const API_KEY ="610d9cf1047a4f408a99e8265b2507ac";
const url = "https://newsapi.org/v2/everything?q=";

async function Fetch(query){

    const res =await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data =await res.json();
    return data;
}
Fetch("all").then(data =>renderMain(data.articles)); 

 let menuBtn =document.querySelector(".menuBtn");
 let mobilemenu =document.querySelector(".mobile");
 let menuBtnDisplay =false;

 menuBtn.addEventListener("click",()=>{
    mobilemenu.classList.toggle("hidden");
 })


 function renderMain(arr){
    let mainHTML = ''
    for(let i = 0 ; i < arr.length ;i++){
        if(arr[i].urlToImage){
        mainHTML += ` <div class="card">
                        <a href=${arr[i].url}>
                        <img src=${arr[i].urlToImage} lazy="loading" />
                        <h4>${arr[i].title}</h4>
                        <div class="publishbyDate">
                            <p>${arr[i].source.name}</p>
                            <span>•</span>
                            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                        </div>
                        <div class="desc">
                           ${arr[i].description}
                        </div>
                        </a>
                     </div>
        `
        }
    }

    document.querySelector("main").innerHTML = mainHTML
}

const searchBtn = document.getElementById("searchForm")
const searchBtnMobile = document.getElementById("searchFormMobile")
const searchInputMobile = document.getElementById("searchInputMobile") 
const searchInput = document.getElementById("searchInput")

searchBtn.addEventListener("click",async(e)=>{
    e.preventDefault();
    const data =await Fetch(searchInput.value)
    renderMain(data.articles)
})
searchBtnMobile.addEventListener("click",async(e)=>{
    e.preventDefault();
    console.log(searchInputMobile.value);
    const data =await Fetch(searchInputMobile.value)
    renderMain(data.articles)
})

async function Search(query){
    const data = await Fetch(query)
    renderMain(data.articles)
}

