let title = document.querySelector('.title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.querySelector('.count');
let category = document.querySelector('.category');
let create = document.querySelector('.create');
let search = document.querySelector('.search');
let titleWarning = document.getElementById('no-title');
let categoryWarning = document.getElementById('no-category');
let countWarning = document.getElementById('no-count');

let mood = 'create';
let tmp;


//get total
function getTotal(){
if(price.value !== ''){
    result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040';
}
else{
    total.innerHTML = '';
    total.style.background = '#a00d02';
}

}
//create product
let dataPro;
if(localStorage.product !== undefined && localStorage.product !== null){
    dataPro = JSON.parse(localStorage.product);
}
else{
    dataPro = [];
}

create.addEventListener('click', ()=>{
if(!title.value.trim('')){
    titleWarning.style.display = 'block';
    categoryWarning.style.display = 'none';

}
else if(!category.value.trim('')){
    categoryWarning.style.display = 'block';
    titleWarning.style.display = 'none';
}

else{
    titleWarning.style.display = 'none';
    categoryWarning.style.display = 'none';

    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value || 0,
        taxes: taxes.value || 0,
        ads: ads.value || 0,
        discount: discount.value || 0,
        total: total.innerHTML || 0,
        count: count.value,
        category: category.value.toLowerCase(),
    };
    //count
if(newPro.count > 100){
    countWarning.style.display = 'block';
}
else{
    countWarning.style.display = 'none';
    if(mood === 'create'){
        if(newPro.count > 1){
            for(let i = 0; i < newPro.count; i++){
            dataPro.push(newPro);
            }
    }
    else{
        dataPro.push(newPro);
    }
        }
    else{
        dataPro[tmp] = newPro;
        mood = 'create';
        create.innerHTML = 'Create';
        count.style.display = 'block';
    }
    clearInputs();
}
   
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();

    }
});

//clear inputs
function clearInputs(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.background = '#a00d02';
    
};

//read
function showData(){
    let table = '';
    for(let i = 0; i < dataPro.length; i++){

        table +=
        `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick = "updateData(${i})" id= "update" class= "update">update</button></td>
        <td><button onclick = "deleteData(${i})" id= "delete" class= "delete">delete</button></td>
        </tr>
          
        `;
    }
   

    document.getElementById('tbody').innerHTML = table;

    let btnDeleteAll = document.getElementById('deleteAll');
    if(dataPro.length > 0){
       btnDeleteAll.innerHTML = 
         `<button onclick = "deleteAll()">Delete All (${dataPro.length})</button>`;
    }
    else{
    btnDeleteAll.innerHTML = '';
    }
}
showData();

//delete data
function deleteData(i){
     dataPro.splice(i,1);
     localStorage.product = JSON.stringify(dataPro);
     showData();
}

//delete all data
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

//update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    mood = 'update';
    create.innerHTML = 'Update';
    tmp = i;
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
    
}
//search
let searchMood = 'Title';
function getSearchMood(id){
    if (id === 'searchTitle'){
        searchMood = 'Title';
    }
    else{
        searchMood = 'Category';
    }
    search.focus();
    search.value = '';
    showData();
    search.placeholder = 'Search By '+ searchMood;
    }

function searchElement(value){
    let table = '';
  for(let i = 0; i<dataPro.length;i++){
    if(searchMood === 'Title'){
        if(dataPro[i].title.includes(value.toLowerCase())){
            table +=
            `
            <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick = "updateData(${i})" id= "update">update</button></td>
            <td><button onclick = "deleteData(${i})" id= "delete">delete</button></td>
            </tr>
              
            `;
        }
    }
    else{
        if(dataPro[i].category.includes(value.toLowerCase())){
            table +=
            `
            <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick = "updateData(${i})" id= "update">update</button></td>
            <td><button onclick = "deleteData(${i})" id= "delete">delete</button></td>
            </tr>
              
            `;
        }
    }
  }
  document.getElementById('tbody').innerHTML = table;

}


