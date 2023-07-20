
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let search = urlParams.get("q") || "";
let genres = urlParams.get("genres") || "";
let page = urlParams.get("page") || 1;



// Set lại tham số 'page' trong URL và chuyển trang

const getAllGame = async()=>{
  try {
    let urlGame = `https://steam-api-mass.onrender.com/games?&q=${search}&page=${page}`;
    if(genres) urlGame+=`&genres=${genres}`;
    const response = await fetch(urlGame);
    if(response.ok){
      const data = await response.json();
      console.log("game",data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
const renderAllGame = async()=>{
  try {
    const display = document.querySelector(".game-wrapper");
    display.innerHTML="";
    const response = await getAllGame();
    
    response.data.forEach((game)=>{
      const element = document.createElement("a");
      element.setAttribute("href",`detail.html?id=${game.appid}`);
      element.classList.add("setImage");
      // const price = game.price;
      element.innerHTML=`<div class="cover">
      <img src=${game.header_image}>
      <div class="game-info" id=${game.appid}>
        <p>${game.name}</p>
        <p>${(game.price)===0?"free to play":(game.price)+"$"}</p>
      </div>
    </div>`;
    display.appendChild(element);
    })
  } catch (error) {
    console.log(error);
  }
}
renderAllGame();
let urlGenres = `https://steam-api-mass.onrender.com/genres?&page=${page}&limit=7`;
const getGenresList = async()=>{
  try {
    const response = await fetch(urlGenres);
    if(response.ok) {
      const data = await response.json();
      console.log("genres",data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

const renderGenres = async()=>{
  try {
    const genresMenu = document.querySelector(".genres");
    const response = await getGenresList();
    const pageData = response.page;
    console.log(pageData);
    response.data.forEach((menu)=>{
      const a = document.createElement("a");
      a.classList.add("type-games");
      if(genres === menu.name) {a.classList.add("active")};
      a.textContent=menu.name;
      a.setAttribute("href",`index.html?genres=${menu.name}`);
      genresMenu.appendChild(a);
    })
  } catch (error) {
    console.log(error);
  }
}
renderGenres();


const form = document.querySelector(".search");
const searchInput = document.querySelector("#searchForm");

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const inputValue = searchInput.value;
  renderSearch(inputValue);
  
})
const searchImg = document.querySelector("#search-img");
searchImg.addEventListener("click",(e)=>{
  e.preventDefault();
  const inputValue = searchInput.value;
  renderSearch(inputValue);
})
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
const pageNumber = document.querySelector(".page-number");

document.querySelector(".previous-page").addEventListener("click",()=>{
  if(page>1)page--;
  pageNumber.textContent = page;
  let urlParams = new URLSearchParams(window.location.search);
  urlParams.set('page', page);
  window.history.replaceState({}, '', `index.html?${urlParams.toString()}`);
  getAllGame(page);
  renderAllGame();
   }
  );
document.querySelector(".next-page").addEventListener("click",()=>{
  page++;
  pageNumber.textContent = page;
  let urlParams = new URLSearchParams(window.location.search);
  urlParams.set('page', page);
  window.history.replaceState({}, '', `index.html?${urlParams.toString()}`);
  getAllGame(page);
  renderAllGame();
})


