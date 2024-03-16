let root = document.getElementById("root");
const images = root.querySelector("img");
const desc = root.querySelector(".desc");
const cartLogo = document.querySelectorAll(".cartLogo");
const productsnumbercount = document.querySelectorAll(".productsnumbercount");
const burgerCount = document.querySelector('#burgerCount');
const PlaceOrder = document.querySelector('#PlaceOrder'); 



data.forEach((item, idx) => {
  let div = document.createElement("div");
  let cartLogo = document.createElement("span");
  let image = document.createElement("img");
  let name = document.createElement("h3");
  let desc = document.createElement("p");
  let count = document.createElement("span");
  image.src = item.images[0].sm;

  let productCount = 0;

  div.classList.add("productsContainer");
  image.classList.add("productImage");
  name.classList.add("productHeading");
  count.classList.add("productsnumbercount");

  cartLogo.innerHTML = `<button class="cartLogo ${idx}"><i class="fa-solid fa-cart-shopping"></i></button>`;
  count.innerHTML = productCount;
  name.innerHTML = item.name;
  desc.innerHTML = `${item.desc.slice(0, 100)}...`;

  div.append(cartLogo, count, image, name, desc);
  root.appendChild(div);
});

let orderItem = [];

// let count =0;
function burger() {
  document.querySelectorAll(".cartLogo").forEach((item, idx) => {
    item.addEventListener("click", (e) => {
      let count = root.children[idx].children[1].innerHTML;
      console.log(count);

      count = parseInt(count);
      count++;
      root.children[idx].children[1].innerText = count;
      
      
      let randomOrderId = Math.floor(Math.random()* 10000);
      console.log(randomOrderId);
      
      let burgerName = root.children[idx].children[3].innerText;
      
      let obj = {
        name : burgerName,
        time : randomOrderId,
      }
      orderItem.push(obj);
      burgerCount.innerText = "";
      burgerCount.innerText = orderItem.length;

    });
  });
}

PlaceOrder.addEventListener('click' , (e) => {
   promiseData(orderItem);
})

let cartContainer = document.querySelector(".cartContainer");


function promiseData(orderItem){
  function processData(obj){
    return new Promise((res, rej) => {
      setTimeout(() =>{
        console.log(obj.name);
        res(obj.time);
      }, obj.time);
    })
  }
  let promiseChain = Promise.resolve();
  orderItem.forEach((item) =>{
    promiseChain = promiseChain.then(() => processData(item))
    .then((data)=>{
      const text = document.getElementById('orderNumberDisplay');
    text.innerHTML = "";
    text.innerHTML = data;
    })
    // console.log();
    
  });
  
};



burger();



