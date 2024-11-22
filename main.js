let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let programMood = 'create';
let tmp;

// get total

function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else {
        total.style.background = '#a00d02'
        total.innerHTML = '0';
    }
}
// create product
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
}
else {
    datapro = [];
}
submit.onclick = function () {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    //ليه مستخدمناش newpro.title

    if (title.value != '' && price.value != '' && category.value != '' && newpro.count <= 100) {
        if (programMood == 'create') {
            if (newpro.count < 1) {
                newpro.count = 1;
            }

            for (let i = 0; i < newpro.count; i++) {
                datapro.push(newpro);
            }
        }
        else {
            datapro[tmp] = newpro;
            programMood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block'
        }

        clearData();

    }
    // save local storage
    localStorage.setItem('product', JSON.stringify(datapro));
    read();
}


// clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    getTotal();
}

// read
function read() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick = 'update(${i})' id = "update">update</button></td>
            <td><button onclick = 'deleteItem(${i})' id = "delete">Delete</button></td>
        </tr>
        `
        console.log(table);
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll')
    if (datapro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick = "deleteAll()">Delete All (${datapro.length})</button>
        `
    }
    else {
        btnDelete.innerHTML = ``;
    }
}
read();

// delete
function deleteItem(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    read();
}

function deleteAll() {
    datapro.splice(0);
    localStorage.clear();
    read();
}
// update
function update(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    count.style.display = 'none';
    getTotal();
    submit.innerHTML = 'Update';
    programMood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}

// search
let searchmood = 'title';

function searchMood(id) {
    let search = document.getElementById('search')
    if (id == 'searchCategory') {
        searchmood = 'category';
    }
    else {
        searchmood = 'title';
    }
    search.placeholder = 'search by ' + searchmood;


    search.focus();
    search.value = '';
    read();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        if (searchmood == 'title') {

            if (datapro[i].title.includes(value.toLowerCase())) {
                table += `
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button id = "update">update</button></td>
            <td><button onclick = 'deleteItem(${i})' id = "delete">Delete</button></td>
            </tr>
            `
            }
        }

        else if (datapro[i].category.includes(value.toLowerCase())) {
            table += `
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button id = "update">update</button></td>
            <td><button onclick = 'deleteItem(${i})' id = "delete">Delete</button></td>
            </tr>
            `
        }


    }

    document.getElementById('tbody').innerHTML = table;
}
// validation

