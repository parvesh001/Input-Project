let form = document.getElementById("form");
let input = document.querySelector(".text-input");
let itemsList = document.querySelector(".items-list");
let clearItems = document.querySelector(".clear-items");
let alertBox = document.querySelector(".alert");
let editFlag = false;
let addBtn = document.querySelector(".btn");
let listText;

/*********EVENT LISTNERS************/

  //FORM'S SUBMIT EVENT
  form.addEventListener("submit", addItems);

  //CLEAR ITEMS' EVENT
  clearItems.addEventListener("click", clearAll);

/***********FUNCTIONS***************/

  //SUBMIT FUNCTION
  function addItems(element) {
    element.preventDefault();
  
    let inputValue = input.value;

    //three different functions in different conditions

    // => 1)
    if (inputValue && !editFlag) {
      let element = document.createElement("li");
      element.classList.add("item");
      element.innerHTML = ` <p class="list-text">${inputValue}</p>
      <div class="btns">
          <i class="fa-solid fa-pen-to-square edit"></i>
          <i class="fa-solid fa-trash delete"></i>
      </div>`;
      itemsList.appendChild(element);
      clearItems.style.visibility = "visible";
      alertMsg("successfully added item", "success");
      setDefault();
  
      //edit btn's and delete btn's events
      let editBtn = element.querySelector(".edit");
      let delBtn = element.querySelector(".delete");
      editBtn.addEventListener("click", editItem);
      delBtn.addEventListener("click", deleteItem);
    } // => 2)
    else if (inputValue && editFlag) {
      listText.innerHTML = input.value;
      addBtn.value = "Add";
      setDefault();
      alertMsg("item edited successfully", "success")
    } // => 3)
    else {
      alertMsg("please enter items", "danger");
    }
  }
  
  // ALERT FUNCTION
  function alertMsg(text, style) {
    alertBox.textContent = text;
    alertBox.classList.add(style);
  
    //defining time of function
    setTimeout(() => {
      alertBox.textContent = "";
      alertBox.classList.remove(style);
    }, 1000);
  }
  
  //SET DEFAULT FUNCTION
  function setDefault() {
    input.value = "";
    editFlag = false;
    addBtn.value = "Add";
  }
  
  //DELETE FUNCTION
  function deleteItem(element) {
   let  item = element.currentTarget.parentElement.parentElement;
    item.remove();
    if (itemsList.children.length == 0) {
      clearItems.style.visibility = "hidden";
    }
    alertMsg("item deleted", "danger");
    setDefault();
  }
  
  // EDIT FUNCTION
  function editItem(element) {
    listText = element.currentTarget.parentElement.previousElementSibling;
    input.value = listText.innerHTML;
    addBtn.value = "Edit";
    editFlag = true;
  }
  
  //CLEAR ALL FUNCTION
  function clearAll(element) {
    element.currentTarget.style.visibility = "hidden";
    let items = document.querySelectorAll(".item");
    items.forEach((item) => {
      item.remove();
    });
    alertMsg("Empty list", "danger");
  }
  