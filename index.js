//get Totla
//create data
//save in the local sotrage
//carrer inputs
//read
//count
//delete
//update
//search
//clean Data
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const changeMod = document.querySelector(".mod");
let mood = "create";
let temp;
let mod = "Dark";

changeMod.addEventListener("click", () => {
  if (mod == "Dark") {
    mod = "light";
    document.body.style.background = "rgb(227, 226, 226)";
    changeMod.innerHTML = `<img src="mods/icons8-sun-50.png">`;
    document.body.style.color = "#222";
    document.body.style.transition = "0.5s";
  } else {
    mod = "Dark";
    changeMod.innerHTML = `<img src="mods/icons8-dark-mode-50.png">`;
    document.body.style.background = "#222";
    document.body.style.color = "white";
  }
});

/////// get total ///////
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = "$" + result;
    total.style.background = "green";
  } else {
    total.innerHTML = "total:$" + 0;
    total.style.background = "red";
  }
}
/////save in local storage/////
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
//create product//
submit.addEventListener("click", () => {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    category: category.value.toLowerCase(),
    total: total.innerHTML,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newPro.count < 100
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else dataPro.push(newPro);
    } else if (mood === "Update") {
      dataPro[temp] = newPro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearData();
  }
  localStorage.setItem("product", JSON.stringify(dataPro));
  displayPro();
});
//clear inputs //
function clearData() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  total.innerHTML = "total:$" + 0;
  count.value = "";
  category.value = "";
  discount.value = "";
}
//Read//
const displayPro = () => {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="UpDate" onclick="updateData(${i})">UpDate</button></td>
        <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
        </tr> `;
  }
  let btnDelete = document.getElementById("btn-delete-all");
  document.getElementById("render").innerHTML = table;
  if (dataPro.length > 1) {
    btnDelete.innerHTML = `
      <button onclick = "deleteAll()">Delete All (${dataPro.length})</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
};
displayPro();
////////// Delete product //////
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  displayPro();
}
/////////// Delete all products //////
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  displayPro();
}
//////// Count /////

////UpdateData////////
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  mood = "Update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//////search/////
let searchMood = "";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitel") searchMood = "title";
  else searchMood = "category";
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  displayPro();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood === "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="UpDate" onclick="updateData(${i})">UpDate</button></td>
        <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
        </tr> `;
      }
    } else if (searchMood === "category") {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="UpDate" onclick="updateData(${i})">UpDate</button></td>
        <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
        </tr> `;
      }
    }
  }
  document.getElementById("render").innerHTML = table;
  console.log(searchMood);
}
