//Variables
const addTag = document.getElementById("agregar");
const txtTag = document.getElementById("item")
const arrayTag = document.getElementById("contenedor");
const cleanTag = document.getElementById("limpiar");
const price = document.getElementById("price");
const tradeBuy = document.getElementById("tradeBuy");
const tradeShell = document.getElementById("tradeShell");
const standar = document.getElementById("standar");
const min = document.getElementById("min");
const cero = document.getElementById("cero");
let arrayObj = [];


//Function

function itemCraft(items, subtotal, trade, iva, total){

    let item ={
        items : items,
        subtotal : subtotal,
        trade : trade,
        iva : iva,
        total : total
    }

    arrayObj.push(item);

    return item;

}

function saveArray(){

    localStorage.setItem('txtArray', JSON.stringify(arrayObj));
    printArray();

}

function printArray(){
    
    arrayTag.innerHTML = '';

    arrayObj = JSON.parse(localStorage.getItem('txtArray'))

    console.log(arrayObj)

    if(arrayObj === null){
        arrayObj = [];
    } else {

        arrayObj.forEach(element => {
            arrayTag.innerHTML += `
            <tr>
                <th>
                    <b>${element.items}</b>          
                </th>
                <th>              
                    <b>${element.trade}</b>          
                </th>
                <th>
                    <b>${element.subtotal}</b>          
                </th>
                <th>
                    <b>${element.iva}</b>          
                </th>
                <th>
                    <b>${element.total}</b>          
                </th>
            </tr>    
            `
        });
    }
}

function removeLocalSt(){
    localStorage.removeItem('txtArray');
    printArray();
}

//EventListener

addTag.addEventListener("click", function(){
    let trade = ''
    let iva = ''
    let total = ''
  
    const descriptionItem = txtTag.value;
    const subtotalPrice = price.value;
    tradeBuy.checked ? trade = 'Compra' : trade = 'Venta'
    tradeShell.checked ? trade = 'Venta' : trade = 'Compra' 
    if(standar.checked){
        iva = price.value * 0.22
        total = parseInt(price.value) + parseInt(price.value * 0.22)
    } else if(min.checked){
        iva = price.value * 0.1
        total = parseInt(price.value) + parseInt(price.value * 0.1)
    } else if(cero.checked){
        iva = price.value * 0
        total = parseInt(price.value) + parseInt(price.value * 0)
    }

    itemCraft(descriptionItem, subtotalPrice, trade, iva, total);

    document.getElementById('item').value = "";
    document.getElementById('price').value = "";
    tradeBuy.checked = false;
    tradeShell.checked = false;
    standar.checked = false;
    min.checked = false;
    cero.checked = false;

    saveArray();

})

cleanTag.addEventListener("click", function(){
    arrayTag.innerHTML = "";
    removeLocalSt();
})

document.addEventListener('DOMContentLoaded', printArray());

function ke(){
    let pack = [];
    document.querySelectorAll('.form-check-input').forEach(element => {
        element.checked == true ? pack.push(element.id) : console.log('no');
    });


}