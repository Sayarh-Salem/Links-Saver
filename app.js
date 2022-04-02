const inputEL = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const btnDelete = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const collectionFromLocalStorage = JSON.parse(
  localStorage.getItem("myCollection")
);

let myCollection = [];

// Display saved links
if (collectionFromLocalStorage) {
  myCollection = collectionFromLocalStorage;
  renderCollection();
  inputEL.style.color = "green";
}

// Display all links
function renderCollection() {
  ulEl.innerHTML = "";
  for (let i = 0; i < myCollection.length; i++) {
    ulEl.innerHTML += `
    <li> 
        <a href="${myCollection[i]}" target="_blank">${myCollection[i]} 
    </li>
    `;
  }
  inputEL.style.color = "green";
}
// Btn SAVE LINKS
inputBtn.addEventListener("click", function show() {
  if (inputEL.value != "" && isValidURL(inputEL.value)) {
    myCollection.push(inputEL.value);
    localStorage.setItem("myCollection", JSON.stringify(myCollection));
    renderCollection();
    inputEL.value = "";
    inputEL.style.color = "green";
  } else {
    inputEL.value = " Invalid url !!! ";
    inputEL.style.color = "red";
  }
});

// btn DELETE
btnDelete.addEventListener("click", function () {
  localStorage.clear("myCollection");
  inputEL.value = "";
  myCollection = [];
  renderCollection();
  inputEL.style.color = "green";
});

//Check if input is valid
function isValidURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

// Save BTN
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    let activeTabId = activeTab.id;
    myCollection.push(tabs[0].url);
    localStorage.setItem("myCollection", JSON.stringify(myCollection));
    renderCollection();
    inputEL.style.color = "green";
    inputEL.value = "";
  });
});

// Clear input on FOCUS
inputEL.addEventListener("focus", () => {
  inputEL.value = " ";
  inputEL.style.color = "green";
});
