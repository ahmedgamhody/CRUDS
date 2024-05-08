let title = document.getElementById("title");
let price = document.getElementById("price");
let takes = document.getElementById("takes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let total = document.querySelector(".inputs .price > span");
let totalNum = document.getElementById("final-price");
let btnCreate = document.getElementById("btn-create");
let searchInp = document.getElementById("search");
let searchBtnTitle = document.getElementById("search-title-btn");
let searchBtnCategory = document.getElementById("search-category-btn");
let mainMood = "create";
let searchMood = "title";
/////
let tableBody = document.getElementById("tbody");
let deletAllBlock = document.getElementById("deletAllBlock");
let tmp;
//
//
function getFinalPrice() {
  if (price.value !== "") {
    let res = +price.value + +takes.value + +ads.value - +discount.value;
    totalNum.innerHTML = res;
    total.style.backgroundColor = "#119211";
  } else {
    totalNum.innerHTML = "";
    total.style.backgroundColor = "#2f2fd7";
  }
}
let products;
if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
} else {
  products = [];
}

function checkDeletAllBtn() {
  if (localStorage.getItem("products") != null) {
    deletAllBlock.innerHTML = `
      <button id="deleteAllBtn" onclick="deletAllItems()">Delete All Items (${products.length}) </button>
      `;
  }
  if (products.length === 0) {
    deletAllBlock.innerHTML = "";
  }
}
checkDeletAllBtn();
btnCreate.onclick = function () {
  if (
    title.value !== "" &&
    price.value !== "" &&
    category.value !== "" &&
    count.value < 100
  ) {
    let newPro = {
      title: title.value,
      price: price.value,
      takes: takes.value,
      ads: ads.value,
      discount: discount.value,
      total: totalNum.innerHTML,
      category: category.value,
      count: count.value,
    };
    if (mainMood == "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          products.push(newPro);
        }
      } else {
        products.push(newPro);
      }
    } else {
      products[tmp] = newPro;
      count.style.display = "block";
      btnCreate.innerHTML = "Create";
      mainMood = "create";
    }

    localStorage.setItem("products", JSON.stringify(products));
    showData();
    checkDeletAllBtn();
    clearFildes();
  } else {
    alert("Please fill all fields or if count is more than 100");
  }
};

function showData() {
  getFinalPrice();
  tableBody.innerHTML = "";
  products.forEach((pro, index) => {
    tableBody.innerHTML += `
        <tr>
        <td>${index + 1}</td>
        <td>${pro.title}</td>
        <td>${pro.price}</td>
        ${pro.takes === "" ? "<td>0</td>" : "<td>" + pro.takes + "</td>"}
        ${pro.ads === "" ? "<td>0</td>" : "<td>" + pro.ads + "</td>"}
        ${pro.discount === "" ? "<td>0</td>" : "<td>" + pro.discount + "</td>"}
        <td>${pro.total}$</td>
        <td>${pro.category}</td>
        <td><button onclick="upDateItem(${index})">Update</button></td>
        <td><button onclick="deletItem(${index})" >Delete</button></td>
      </tr>
        `;
  });
}

showData();

function deletItem(id) {
  products.splice(id, 1);
  localStorage.setItem("products", JSON.stringify(products));
  showData();
  checkDeletAllBtn();
}

function deletAllItems() {
  clearFildes();
  products.length = 0;
  // localStorage.clear();
  localStorage.removeItem("products");
  showData();
  checkDeletAllBtn();
}

function upDateItem(id) {
  title.value = products[id].title;
  price.value = products[id].price;
  takes.value = products[id].takes || 0;
  discount.value = products[id].discount || 0;
  ads.value = products[id].ads || 0;
  category.value = products[id].category;
  count.style.display = "none";
  btnCreate.innerHTML = "Update";
  mainMood = "update";
  tmp = id;
  getFinalPrice();
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

function clearFildes() {
  title.value = "";
  price.value = "";
  category.value = "";
  count.value = "";
  totalNum.innerHTML = "";
  ads.value = "";
  takes.value = "";
  discount.value = "";
}

function search(id) {
  if (id == "search-title-btn") {
    searchMood = "title";
    searchInp.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    searchInp.placeholder = "Search By Category";
  }
  searchInp.focus();
  searchInp.value = "";
  showData();
}

function searchData(pattern) {
  let table = "";
  for (let i = 0; i < products.length; i++) {
    if (searchMood == "title") {
      if (products[i].title.toLowerCase().includes(pattern.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        ${
          products[i].takes === ""
            ? "<td>0</td>"
            : "<td>" + products[i].takes + "</td>"
        }
        ${
          products[i].ads === ""
            ? "<td>0</td>"
            : "<td>" + products[i].ads + "</td>"
        }
        ${
          products[i].discount === ""
            ? "<td>0</td>"
            : "<td>" + products[i].discount + "</td>"
        }
        <td>${products[i].total}$</td>
        <td>${products[i].category}</td>
        <td><button onclick="upDateItem(${i})">Update</button></td>
        <td><button onclick="deletItem(${i})" >Delete</button></td>
      </tr>
        `;
      }
    } else {
      if (products[i].category.toLowerCase().includes(pattern.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        ${
          products[i].takes === ""
            ? "<td>0</td>"
            : "<td>" + products[i].takes + "</td>"
        }
        ${
          products[i].ads === ""
            ? "<td>0</td>"
            : "<td>" + products[i].ads + "</td>"
        }
        ${
          products[i].discount === ""
            ? "<td>0</td>"
            : "<td>" + products[i].discount + "</td>"
        }
        <td>${products[i].total}$</td>
        <td>${products[i].category}</td>
        <td><button onclick="upDateItem(${i})">Update</button></td>
        <td><button onclick="deletItem(${i})" >Delete</button></td>
      </tr>
        `;
      }
    }
  }

  tableBody.innerHTML = table;
}

/////////////////////////////////////////////////////////////
// let title = document.getElementById("title");
// let price = document.getElementById("price");
// let takes = document.getElementById("takes");
// let ads = document.getElementById("ads");
// let discount = document.getElementById("discount");
// let count = document.getElementById("count");
// let category = document.getElementById("category");
// let total = document.querySelector(".inputs .price > span");
// let totalNum = document.getElementById("final-price");
// let btnCreate = document.getElementById("btn-create");
// let searchInp = document.getElementById("search");
// let searchBtnTitle = document.getElementById("search-title-btn");
// let searchBtnCategory = document.getElementById("search-category-btn");
// let mainMood = "create";
// let searchMood = "title";
// /////
// let tableBody = document.getElementById("tbody");
// let deletAllBlock = document.getElementById("deletAllBlock");
// let tmp;

// function getFinalPrice() {
//   if (price.value != "") {
//     let res = +price.value + +takes.value + +ads.value - +discount.value;
//     totalNum.innerHTML = res;
//     total.style.backgroundColor = "green";
//   } else {
//     totalNum.innerHTML = "";
//     total.style.backgroundColor = "#2f2fd7";
//   }
// }
// getFinalPrice();

// let products;
// if (localStorage.getItem("products")) {
//   products = JSON.parse(localStorage.getItem("products"));
// } else {
//   products = [];
// }

// btnCreate.onclick = function () {
//   if (title.value != "" && price.value != "") {
//     let newPro = {
//       title: title.value,
//       price: price.value,
//       takes: takes.value,
//       ads: ads.value,
//       discount: discount.value,
//       total: totalNum.innerHTML,
//       category: category.value,
//       count: count.value,
//     };

//     if (mainMood == "create") {
//       if (newPro.count > 1) {
//         for (let i = 0; i < newPro.count; i++) {
//           products.push(newPro);
//         }
//       } else {
//         products.push(newPro);
//       }
//     } else {
//       products[tmp] = newPro;
//       count.style.display = "block";
//       btnCreate.innerHTML = "Create";
//       mainMood = "create";
//     }

//     localStorage.setItem("products", JSON.stringify(products));
//     showData();
//     clearFildes();
//     getFinalPrice();
//   } else {
//     alert("Please fill the fildes");
//   }
// };

// function clearFildes() {
//   title.value = "";
//   price.value = "";
//   category.value = "";
//   count.value = "";
//   totalNum.innerHTML = "";
//   ads.value = "";
//   takes.value = "";
//   discount.value = "";
// }

// function showData() {
//   tableBody.innerHTML = "";
//   products.forEach((pro, index) => {
//     tableBody.innerHTML += `
//         <tr>
//         <td>${index + 1}</td>
//         <td>${pro.title}</td>
//         <td>${pro.price}</td>
//         ${pro.takes === "" ? "<td>0</td>" : "<td>" + pro.takes + "</td>"}
//         ${pro.ads === "" ? "<td>0</td>" : "<td>" + pro.ads + "</td>"}
//         ${pro.discount === "" ? "<td>0</td>" : "<td>" + pro.discount + "</td>"}
//         <td>${pro.total}$</td>
//         <td>${pro.category}</td>
//         <td><button onclick="upDateItem(${index})">Update</button></td>
//         <td><button onclick="deletItem(${index})" >Delete</button></td>
//       </tr>
//         `;
//   });
// }

// showData();

// function checkDeletAllBtn() {
//   if (localStorage.getItem("products") != null) {
//     deletAllBlock.innerHTML = `
//       <button id="deleteAllBtn" onclick="deletAllItems()">Delete All Items (${products.length}) </button>
//       `;
//   }
//   if (products.length === 0) {
//     deletAllBlock.innerHTML = "";
//   }
// }
// checkDeletAllBtn();
// function deletAllItems() {
//   clearFildes();
//   products.length = 0;
//   localStorage.removeItem("products");
//   showData();
//   checkDeletAllBtn();
// }

// function deletItem(id) {
//   products.splice(id, 1);
//   localStorage.setItem("products", JSON.stringify(products));
//   showData();
//   checkDeletAllBtn();
// }

// function upDateItem(id) {
//   title.value = products[id].title;
//   price.value = products[id].price;
//   takes.value = products[id].takes || 0;
//   discount.value = products[id].discount || 0;
//   ads.value = products[id].ads || 0;
//   category.value = products[id].category;
//   count.style.display = "none";
//   btnCreate.innerHTML = "Update";
//   mainMood = "update";
//   tmp = id;
//   getFinalPrice();
//   scroll({
//     top: 0,
//     behavior: "smooth",
//   });
// }

// function search(id) {
//   if (id == "search-title-btn") {
//     searchMood = "title";
//     searchInp.placeholder = "Search By Title";
//   } else {
//     searchMood = "category";
//     searchInp.placeholder = "Search By Category";
//   }
//   searchInp.focus();
//   searchInp.value = "";
//   showData();
// }

// function searchData(pattern) {
//   let table = "";
//   for (let i = 0; i < products.length; i++) {
//     if (searchMood == "title") {
//       if (products[i].title.toLowerCase().includes(pattern.toLowerCase())) {
//         table += `
//         <tr>
//         <td>${i + 1}</td>
//         <td>${products[i].title}</td>
//         <td>${products[i].price}</td>
//         ${
//           products[i].takes === ""
//             ? "<td>0</td>"
//             : "<td>" + products[i].takes + "</td>"
//         }
//         ${
//           products[i].ads === ""
//             ? "<td>0</td>"
//             : "<td>" + products[i].ads + "</td>"
//         }
//         ${
//           products[i].discount === ""
//             ? "<td>0</td>"
//             : "<td>" + products[i].discount + "</td>"
//         }
//         <td>${products[i].total}$</td>
//         <td>${products[i].category}</td>
//         <td><button onclick="upDateItem(${i})">Update</button></td>
//         <td><button onclick="deletItem(${i})" >Delete</button></td>
//       </tr>
//         `;
//       }
//     }
//     //
//     //
//     //
//     else {
//       if (products[i].category.toLowerCase().includes(pattern.toLowerCase())) {
//         table += `
//         <tr>
//         <td>${i + 1}</td>
//         <td>${products[i].title}</td>
//         <td>${products[i].price}</td>
//         ${
//           products[i].takes === ""
//             ? "<td>0</td>"
//             : "<td>" + products[i].takes + "</td>"
//         }
//         ${
//           products[i].ads === ""
//             ? "<td>0</td>"
//             : "<td>" + products[i].ads + "</td>"
//         }
//         ${
//           products[i].discount === ""
//             ? "<td>0</td>"
//             : "<td>" + products[i].discount + "</td>"
//         }
//         <td>${products[i].total}$</td>
//         <td>${products[i].category}</td>
//         <td><button onclick="upDateItem(${i})">Update</button></td>
//         <td><button onclick="deletItem(${i})" >Delete</button></td>
//       </tr>
//         `;
//       }
//     }
//   }

//   tableBody.innerHTML = table;
// }
