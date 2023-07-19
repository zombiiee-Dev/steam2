
const queryString = window.location.search;

let urlParam = new URLSearchParams(queryString);

let genres = urlParam.get("genres") || "";
let search = urlParam.get("q") || "";
let page = urlParam.get("page") || 1;

console.log(search);


const getAllGame = async(search,genres,page)=>{
    try {
        let urlGame = `https://steam-api-mass.onrender.com/games?q=${search}&page=${page}`;
        if (genres) {
            urlGame += `&genres=${genres}`
          }
        const response = await fetch(urlGame);
        if(response.ok) {
            const data = await response.json();
            console.log("check",data);
            return data;
        } 
    } catch (error) {
        console.log(error);
    }
 }
 const promiseGetGame = getAllGame();
const display = document.querySelector(".game-wrapper");
const renderAllGame = async()=>{
    display.innerHTML="";
    const response = await getAllGame(search,genres,page);
    response.data.forEach((game)=>{
        const price = game.price;
        const element = document.createElement("a");
        element.setAttribute("class","setImage");
        element.setAttribute("href",`detail.html?id=${game.appid}`);
        element.innerHTML=`<div class="cover">
        <img src=${game.header_image}>
        <div class="game-info" id=${game.appid}>
          <p>${price===0?"free to play":price+"$"}</p>
          <p>${game.name}</p>
        </div>
      </div>`;
      display.appendChild(element);
    })
}
renderAllGame();
const pageNumber = document.querySelector(".pageNumber");
const buttonPrevious = document.querySelector(".previousPage").addEventListener("click",(e)=>{
    previousPage();
});
const buttonNext = document.querySelector(".nextPage").addEventListener("click",(e)=>{
    nextPage();
  }
);

const previousPage = () => {
   
    if (page > 1) {
      page--;
      pageNumber.textContent=page;
      getAllGame(search, genres, page);
      renderAllGame();
    }
  };
const nextPage = () => {
   
    page++;
    pageNumber.textContent=page;
    getAllGame(search, genres, page);
    renderAllGame();
  };

const urlMenu = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com/genres?&page=1&limit=7";
const getMenu = async()=>{
    try {
        const response = await fetch(urlMenu);
        if(response.ok){
            const data = await response.json();
            console.log("oday",data);
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

const renderMenu = async()=>{
    try {
        const genresMenu = document.querySelector(".genres");
       
        const response = await getMenu();
        response.data.forEach((menu)=>{
            const x = document.createElement("a");
            x.classList.add("type-games");
           if (genres === menu.name) {x.classList.add("active");}
            x.textContent= menu.name;
            x.setAttribute("href",`index.html?genres=${menu.name}&page=${page}`);
            genresMenu.appendChild(x);
        })
    } catch (error) {
        console.log(error);
    }
}
renderMenu();



const urlGenres = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?genres=${genres}&page=${page}`;

const getGenres = async()=>{
try {
    const response = await fetch(urlGenres);
    if(response.ok){
        const data = await response.json();
        console.log("123",data);
        return data;
    }
} catch (error) {
    console.log(error);
}
}
const renderGenres = async()=>{
    try {
        display.innerHTML="";
        const response = await getGenres(genres,page);
        response.data.forEach((game)=>{
            const price = game.price;
            const element = document.createElement("a");
        element.setAttribute("class","setImage");
        element.setAttribute("href",`detail.html?id=${game.appid}`);
        element.innerHTML=`<div class="cover">
        <img src=${game.header_image}>
        <div class="game-info" id=${game.appid}>
          <p>${price===0?"free to play":price+"$"}</p>
          <p>${game.name}</p>
        </div>
      </div>`;
      display.appendChild(element);
        })
    } catch (error) {
        console.log(error);
    }
}
renderGenres();

// const getSearch = async(search)=>{
//     try {
//      let urlSearch = `https://steam-api-mass.onrender.com/games?q=${search}`;
//      const response = await fetch(urlSearch);
//        if (response.ok) {
//          const data = await response.json();
//          // console.log("dataSearch",data);
//          return data;
     
//     }} catch (error) {
//      console.log("renderSearch",error);
//     }
//    }
   
   const renderSearch = async (search) => {
     try {
       const dataSearch = await getAllGame(search);
       if(dataSearch) {
         window.location.href = `index.html?q=${search}`;
         }
       } catch (error) {
       console.log(error);
     }
   };
   
   const searchForm = document.querySelector("#searchForm");   
   const searchInput = document.querySelector(".search");  
  
   searchInput.addEventListener("submit",(e)=>{
       e.preventDefault();
       let inputSearch = e.target.searchForm.value;
       console.log(inputSearch);
       renderSearch(inputSearch);
       })
   const searchImg = document.querySelector("#search-img");
     searchImg.addEventListener("click",(e)=>{
     e.preventDefault();
     let inputSearch = searchForm.value;
     console.log(inputSearch);
     renderSearch(inputSearch);
   })


  
  