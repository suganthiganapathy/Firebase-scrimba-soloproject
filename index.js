import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
"https://champions-4f725-default-rtdb.europe-west1.firebasedatabase.app/"
};

// initialise the app
const app = initializeApp(appSettings);
//console.log(app);

// get the firebase database
const dataBase = getDatabase(app);

const detailsInDataBase = ref(dataBase, "WeChampions");

// Calling main container
//let mainContainer=document.getElementById("main")


let inputTxtElement = document.getElementById("inputTxt");

let listElements=document.getElementById("listItems")


let buttonElement = document.getElementById("btnEl");
let fromInputName = document.getElementById("fromName");
let toInputName = document.getElementById("toName");

// to get the values from the database using onValue function

onValue(detailsInDataBase, function (snapshot) {
// the values in the firebase has been stored as a object convert the object into array;
 let arrayItems = Object.values(snapshot.val())
// //console.log(arrayItems)
 for(let i=0;i<arrayItems.length;i+=3){
     dispayInput(arrayItems[i],arrayItems[i+1],arrayItems[i+2])
// }
// dispayInput(snapshot.val())  
console.log(snapshot.val())
}});

buttonElement.addEventListener("click", function () {
  // displayTxtElement.textContent=inputTxtElement.value;
  let inputValue = inputTxtElement.value;

  let fromNameValue = fromInputName.value;
  let toNameValue = toInputName.value;

 // let objectValues = {inputMessage:inputValue,from:fromNameValue,to:toNameValue}
 //push(detailsInDataBase,objectValues)
 push(detailsInDataBase, fromNameValue);
  push(detailsInDataBase, toNameValue);

  push(detailsInDataBase, inputValue);
  //ddispayInput(inputValue);
dispayInput(inputValue, fromNameValue, toNameValue);
//   console.log(
//     `${inputValue},${fromNameValue},${toNameValue} has been added to the data base`
//   );
});

function clear(){
    inputTxtElement.value="";
    fromInputName.value="";
    toInputName.value="";

}
function dispayInput(fromValue,toValue,inputItemValue) {
  listElements.innerHTML +=`<li class="displayItems">From:${fromValue}<br/>${inputItemValue}<br/>To:${toValue}  <br/></li> `

// displayTxtElement.textContent +=`${inputItemValue}`;
clear()
//displayTxtElement.innerHTML += `<p class="displayItems">${inputItemValue} </p>`

}

 


