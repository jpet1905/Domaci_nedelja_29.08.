const data = [
    {
        id: 0,
        desc: "Skuvati kafu",
        done: true
    },
    {
        id: 1,
        desc: "Zaliti cvece",
        done: false
    },
    {
        id: 2,
        desc: "Otici u market po hleb",
        done: true
    },
    {
        id: 3,
        desc: "Napraviti dorucak",
        done: true
    },
    {
        id: 4,
        desc: "Citati knjigu",
        done: false
    },
]

let count = 5; //duzina niza od koje startujemo (ne moramo da export jer je vidljiva funkciji dole koja radi sa njim)

const addToArray = (item) => {  //funkcija za ubacivanje u niz
    item.id = count++; //ova varijanta: objekat ima samo desc i done, id mu pravimo
    data.push(item);
    return item.id;
}

//druga varijanta:
// const add = (item) => {
//     data.push({id: count++, ...item});
//     return count - 1;
// }

const deleteById = (id) => {
    let index = data.findIndex(item => item.id == id);
    data.splice(index, 1);
}

const changeById = (id, noviItem) => {
    let index = data.findIndex(item => item.id == id);
    data.splice(index, 1, noviItem);
}

export let obj = {
    data,
    addToArray,
    deleteById,
    changeById
}