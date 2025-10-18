//categories

const loadCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};

let cart = [];
let total = 0;
const cartLimit = 20;

const displayCategory = (categories) => {
  // console.log(categories)
    const categoryContainer = document.getElementById("catgr_container");
    categoryContainer.innerHTML = "";

    const all_catgr = document.createElement("div");
    all_catgr.id = "all"
    all_catgr.className = "p-3 hover:bg-[#15803D] rounded-lg cursor-pointer";
    all_catgr.textContent = "All trees";
    categoryContainer.append(all_catgr);

    for (const category of categories) {
    const catgr = document.createElement("div");
    catgr.id = String(category.id);
    catgr.className = "p-3 hover:bg-[#15803D] rounded-lg cursor-pointer mt-2";
    catgr.textContent = category.category_name;
    categoryContainer.append(catgr);
    }
    
    categoryContainer.addEventListener("click", (e) => {
    const all_catgr = categoryContainer.querySelectorAll("div");
    all_catgr.forEach((catgr_i) => {
      catgr_i.classList.remove("bg-[#15803D]", "text-white", "rounded");
    });
    if (e.target.localName === "div") {
      e.target.classList.add("bg-[#15803D]", "text-white", "rounded");
      if(e.target.id === "all"){
        loadAllPlants();
      }
      else{
        loadPlantsCategories(e.target.id)
      }
      
    }
  });
    const allTrees = document.getElementById("all");
    if (allTrees) {
    allTrees.classList.add("bg-[#15803D]", "text-white", "rounded");
    }
    };

const loadPlantsCategories = (categoryId) => {
  document.getElementById("card_container").classList.add("hidden");
  document.getElementById("loading-spinner").classList.remove("hidden");

    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      displayPlants(data.plants);
    })
    .catch((err) => {
      console.log(err);
    document.getElementById("loading-spinner").classList.add("hidden");
    document.getElementById("card_container").classList.remove("hidden");
    });
};

const loadAllPlants = async () => {
  document.getElementById("card_container").classList.add("hidden");
  document.getElementById("loading-spinner").classList.remove("hidden");
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    const ids = data.categories.map(cat => cat.id);
    const all = await Promise.all(
      ids.map(id =>
        fetch(`https://openapi.programming-hero.com/api/category/${id}`)
          .then(r => r.json())
          .then(j => j.plants || [])
      )
    );
  displayPlants(all.flat());
  } catch (err) {
    console.error("Error loading all plants:", err);
  }
 
};

// Modal Tree details
const loadTreeDetails = (id) =>{
  const url = `https://openapi.programming-hero.com/api/plant/${id}`
  fetch(url)
  .then(res => res.json())
  .then((data) => displayTreesDetails(data.plants))

}

const displayPlants = (plants) => {
    let treeContainer = document.getElementById("card_container")
    treeContainer.innerHTML = "";
    plants.forEach((plant) => {
    treeContainer.innerHTML += `
 
     <div class="bg-white p-3 rounded-xl trees-card">
                        <div class="">
                            <img class="rounded-xl h-60 w-70" src="${plant.image}" alt="">
                        </div>
                        <div class="">
                            <h2 onClick ="loadTreeDetails(${plant.id})" class="tree-title text-s font-bold mt-2">${plant.name}</h2>
                            <p class="text-xs text-gray-600 my-2">${plant.description}</p>
                        </div>
                        <div class="flex items-center justify-between my-2">
                            <h2 class="btn rounded-full bg-[#DCFCE7] text-[#15803D]">${plant.category}</h2>
                            <h2 class="tree-price text-s font-semibold text-gray-700">৳${plant.price}</h2>
                        </div>
                        <div class="">
                            <button onClick = "addToCard(this)" class="btn bg-[#15803D] text-white rounded-full w-full">Add to Cart</button>
                        </div>
                    </div>
       
        `;
        });
        document.getElementById("card_container").classList.remove("hidden");
        document.getElementById("loading-spinner").classList.add("hidden");
        };


const displayTreesDetails = (plant) =>{
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
    <div class="shadow-lg trees-card p-3 rounded-2xl">
        <div><h1 class="tree-title text-xl font-bold">${plant.name}</h1></div>   
    <div>
        <img src="${plant.image}" alt="" class="h-[350px] rounded-2xl w-full pb-5">
      </div>
      <div>
        <h1 class ="font-bold">Category: ${plant.category}</h1>
        <span class="tree-price block mb-2">Price: ৳${plant.price}</span>
      <p>Description: ${plant.description}</p>
      </div>
      <div class="flex justify-end pt-4">
      <button id="modal-close-btn" class="btn bg-gray-200 text-black rounded">
        Close
      </button>
    </div>
  </div>
  `;
  const modal = document.getElementById('my_modal_3');
    modal.showModal();
    document.getElementById('modal-close-btn').addEventListener('click', () => {
    modal.close();
    })
    

    }

const treeContainer = document.getElementById("card_containerr");

loadCategories();
loadAllPlants();

const addToCard = (btn) =>{
  if(cart.length >= cartLimit){
    showCartNotice(`Limit Reached: maximum ${cartLimit} items.`);
    disableAddButtons(true);
    return;
  }
    const card = btn.parentNode.parentNode;
    const treeTitle = card.querySelector(".tree-title").innerText;
    const treePrice = card.querySelector(".tree-price").innerText;
    const treePriceNum = Number(treePrice.replace(/[^\d.]/g, ""));

    const selectedItem = {
    treeTitle: treeTitle,
    treePrice: treePriceNum,
    }

    cart.push(selectedItem)

    console.log(cart)

    total += treePriceNum;

    displayCart(cart)

    displayTotal(total); 

    showAddedModal(treeTitle);
    }

const displayTotal = (val) => {
  document.getElementById('cart-total').innerHTML = `৳${val}`;
 }

const displayCart = (cart) =>{
const cartContainer = document.getElementById('cart_container');
cartContainer.innerHTML = "";
for(let item of cart){
  const newItem = document.createElement("div")
  newItem.innerHTML = `
  <div class="bg-[#F0FDF4] p-0 flex items-center justify-between rounded-xl mb-2">
                                <div class="card-body pl-2">
                                    <h2 class="card-title text-xs font-semibold">${item.treeTitle}</h2>
                                    <p class="item-price text-xs font-semibold text-gray-500">৳${item.treePrice} x 1</p>
                                </div>
                                <div onClick = "removeCart(this)" class="">
                                    <button><i class="fa-solid fa-x pr-2"></i></button>
                                </div>
                            </div> 
  `
  cartContainer.append(newItem);
}
}

const removeCart = (btn) =>{
  const item = btn.parentNode;
  const treeTitle = item.querySelector('.card-title').innerText;
  const treePrice = Number(item.querySelector('.item-price').innerText);
  console.log(treeTitle)
  
  cart = cart.filter((item) => item.treeTitle != treeTitle);
  total = 0;
  cart.forEach((item) => (total += item.treePrice));
  displayCart(cart)
  displayTotal(total);
  
  
}

const showAddedModal = (title) => {
  const modal = document.getElementById('cart_modal');
  document.getElementById('cart_modal_msg').textContent = `${title} has been added to the cart.`;
  modal.showModal();
  document.getElementById('cart_modal_ok').onclick = () => modal.close();
};