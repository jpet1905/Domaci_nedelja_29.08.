import { obj } from "./service.js";

//selektovanja
const forma = document.querySelector('form');
const inputToDo = document.querySelector('#unos');
const prikazListe = document.querySelector('#prikaz');

//funkcija za unos na stranicu
const addToPage = (item) => {
    const itemContainer = document.createElement('div')
    itemContainer.classList.add('izdvojeno');
    prikazListe.appendChild(itemContainer);
    const paragraf = document.createElement('p');
    paragraf.innerHTML = `${item.desc}`;
    const label = document.createElement('label');
    label.textContent = 'uradjeno: ';
    const inputDone = document.createElement('input');
    inputDone.type = 'checkbox';
    //uslov zbog "starih" stavki od kojih su vec neki odradjeni
    if (item.done == true) {
        inputDone.checked = true;
        paragraf.className = 'done';
    }
    //za obelezavanje odradjenih zadataka sa liste (nove i stare)
    inputDone.addEventListener('click', () => {
        if (inputDone.checked) {
            item.done = true;
            paragraf.className = 'done';
        } else {
            item.done = false;
            paragraf.classList.remove('done');
        }
    })
    const btnDel = document.createElement('button');
    btnDel.textContent = 'Obrisi ovo';
    btnDel.addEventListener('click', () => {
        itemContainer.remove(); //brisanje sa stranice
        obj.deleteById(item.id);  //brisanje iz niza
        console.log(obj.data);
    })
    itemContainer.append(paragraf, label, inputDone, btnDel);
}

//funkcija za validaciju
const isValid = (item) => {
    return item.desc != ''; //ne moze biti prazan desc za item
}

obj.data.forEach(item => { //da ispise na stranici vec postojece stavke
    addToPage(item);
})

//-------------------------------------------------------------------------------
//za unos novih elemenata

//setujemo parametre
let timer;
let intervalBezKucanja = 5000;  //vreme u ms (5 sekundi)

//od prestanka kucanja, pocni odbrojavanje
inputToDo.addEventListener('keyup', () => {  //da bude automatsko azuruiranje
    clearTimeout(timer); //resetovanje timera
    if (inputToDo) { //ako je uopste ista uneto, kao vrsta validacija, pocni odbrojavanje pre izvrsenja f-je
        timer = setTimeout(doneTyping, intervalBezKucanja);
    }
})
//definisem sta funkcija radi kad se zavrsi odbrojavanje
function doneTyping() {
    let item = {
        desc: inputToDo.value,
        done: false //krenemo da mu je defaultna vrednost "false" tj. da nije uradjen jer je tek dodat u listu
    }

    obj.addToArray(item); //dodaje u niz
    console.log(obj.data);
    addToPage(item); //dodajem na stranicu

    //resetovanje polja
    inputToDo.value = '';
}
//-----------------------------------------------------------------------------------