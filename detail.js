
// let search = window.location.search;
// // console.log(search); //?id=730
// function getID(search) {
//     let id;
//     const a = search.split("?");
//     if (a.length > 1) {
//       const b = a[1].split("=");
//       if (b.length > 1) {
//         id = b[1];
//       }
//     }
//     return id;
//   }
// const id = getID(search);
// console.log(id);
// join()
//ID => lấy API -> render

let search = "";
let genre = "";
let page = 1;
let limit = 10;

const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

genre = urlParams.get("genres") || "";

search = urlParams.get("q") || "";

id = urlParams.get("id") || "";
console.log(search);



const fetchDataDetail = async() => {
       try {
     const response = await fetch(`https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/${id}`);
     if(response.ok) {
        const data = await response.json();
        return data;
      }
      console.log(data);
        }
      catch (error) {
        console.log(error.message);
    }
}
// fetchDataDetail();
// Image on click
const renderDetail = async() =>{
    try {
        const gameData = await fetchDataDetail();
        const display = document.querySelector("#display");
        const displayTitle = document.querySelector("#displayTitle");
        console.log(gameData.data);
        if (!display) return;
        display.innerHTML = "";
        displayTitle.innerHTML = gameData.data.genres[0];
  
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `<div class="showing_game show_detail">
      <div class="title_contain ">
      <div class="title">${gameData.data.name}</div>
      <div class="price">${
        gameData.data.price === 0
          ? "free to play"
          : gameData.data.price +"$"}</div>
      </div>
      <div class="img_detail">
      <img src="${gameData.data.header_image}" alt="${gameData.data.name}" />
      <div class="game_details">
      <div class="game_description">${gameData.data.description}</div>
      <div class="game_informations">
      <p>ACHIEVEMENT: ${gameData.data.achievements}</p>
      <p>RELEASE DATE:  ${gameData.data.release_date}</p>
      <p>RATING:  ${gameData.data.negative_ratings}</p>
      <p>OWNERS:  ${gameData.data.owners}</p>
      </div>
      </div>
      </div>
      <div class="tags_contain">
      Popular user-defined tags for this product:
      <div class="tags">
      <div class="tag"><a href="${gameData.data.categories[0]}">${gameData.data.categories[0]}</a></div> 
      <div class="tag"><a href="${gameData.data.categories[1]}">${gameData.data.categories[1]}</a></div>
      <div class="tag"><a href="${gameData.data.categories[2]}">${gameData.data.categories[2]}</a></div>
      <div class="tag"><a href="${gameData.data.categories[3]}">${gameData.data.categories[3]}</a></div>
      <div class="tag"><a href="${gameData.data.categories[4]}">${gameData.data.categories[4]}</a></div>
      <div class="tag"><a href="${gameData.data.categories[5]}">${gameData.data.categories[5]}</a></div>
      <div class="tag"><a href="${gameData.data.categories[6]}">${gameData.data.categories[6]}</a></div>
      <div class="tag"><a href="${gameData.data.categories[7]}">${gameData.data.categories[7]}</a></div>
      </div>
      </div>
      </div>`;
    display.appendChild(newDiv);
        
    } catch (error) {
        console.log("error-single",error.message);
    }
}
// gameData.data.categories.forEach(category => {
//     const tag = document.createElement("div");
//     tag.classList.add("tag");
//     const link = document.createElement("a");
//     link.href = category;
//     link.textContent = category;
//     tag.appendChild(link);
//     // Thêm tag vào vị trí mong muốn trong DOM
//     // Ví dụ: document.querySelector(".tag-container").appendChild(tag);
//   });
  
renderDetail();
const getGenresList = async() =>{
  const url_genres = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/genres?page=1&limit=7`
  try {
    const response = await fetch(url_genres);
    const data = await response.json();
    console.log(data);
    return data;
   
  } catch (error) {
    console.log("error-genres",error.message);
  }
}

const renderGenresList = async() =>{
  const dataGenres = await getGenresList();

  const genresList = document.querySelector(".category");
  dataGenres.data.forEach(genres => {
    const x = document.createElement("a");
    x.classList.add("type-games");

    if (genre === genres.name) {
      x.classList.add("active");
    }
    x.textContent=genres.name;
    x.setAttribute("href",`index.html?genres=${genres.name}`); // ?key=value, setAttribute("id", `?id=${id})`
    genresList.appendChild(x);
  })
}

renderGenresList();

const getSearch = async(search)=>{
  try {
   let urlSearch = `https://steam-api-mass.onrender.com/games?q=${search}`;
   const response = await fetch(urlSearch);
     if (response.ok) {
       const data = await response.json();
       // console.log("dataSearch",data);
       return data;
   
  }} catch (error) {
   console.log("renderSearch",error);
  }
 }  
const renderSearch = async (search) => {
    try {
      const dataSearch = await getSearch(search);
      if(dataSearch) {
        window.location.href = `index.html?q=${search}`;
        }
      } catch (error) {
      console.log(error);
    }
  };
  
  const searchForm = document.querySelector("#searchform");   
  const searchInput = document.querySelector("#store_search");  
  searchInput.addEventListener("submit",(e)=>{
      e.preventDefault();
      let inputSearch = e.target.searchForm.value;
       renderSearch(inputSearch);
      })
      const searchImg = document.querySelector("#search-img-detail");
    searchImg.addEventListener("click",(e)=>{
    e.preventDefault();
    let inputSearch = searchForm.value;
       renderSearch(inputSearch);
  })




