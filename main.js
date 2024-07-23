const wrapper = document.querySelector(".wrapper")
const seeMoreBtn = document.querySelector(".see-more__btn")

const API_URL = "https://dummyjson.com"

let perPageCount = 6
let offset = 1
let categoryValuy = ""

async function fetchData(api, limit, category){
    let reponse = await fetch(`${api}/products${category}?limit=${limit}`)
    reponse
    .json()
    .then(res => createCard(res))
    .catch(err => console.log(err))
    .finally()
}
fetchData(API_URL, perPageCount, "")

function createCard(data){
    while(wrapper.firstChild){
        wrapper.firstChild.remove()
    }
    data.products.forEach((product) => {
        let cardItem = document.createElement("div")
        cardItem.classList.add("card")
        cardItem.innerHTML =`
        <figure>
              <img class="card__img" src="${product.thumbnail}" alt="${product.title}">
        </figure>
        <h3>${product.title}</h3>
        <p class="desc cards__p- cards__p--" title="${product.description}">${product.description}</p>
        <button class="birbalo-btn">Buy now</button>
        `
        wrapper.appendChild(cardItem)
    })
}
async function fetchCategory(api) {
    let response = await fetch(`${api}/products/category-list`)
    response
        .json()
        .then(res => createCategory(res))

}
seeMoreBtn.addEventListener('click', () => {
    offset++
    fetchData(API_URL, perPageCount * offset, categoryValuy)
})

wrapper.addEventListener("click", e => {
    if(e.target.className.includes("card__img")){
        window.open(`/pages/product.html?id=${e.target.closest(".card").dataset.id} `, "_self")
    }
})