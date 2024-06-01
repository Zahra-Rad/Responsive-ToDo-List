const btnsAdd = document.querySelectorAll(".addToList");
const inps = document.querySelectorAll(".inp");
const uncomplete = document.querySelector("#uncompleted_list");
const complete = document.querySelector("#completed_list");

///// checking to show Completed /////

const checkLists = () =>
  complete.innerHTML != ""
    ? complete.previousElementSibling.classList.remove("hidden")
    : complete.previousElementSibling.classList.add("hidden");
checkLists();

///// adding to the uncomplete list /////

const addToList = (task, index) => {
  let uncomplete_li = document.createElement("li");
  uncomplete_li.innerHTML = `<h3>
    <span class="checkbox"></span>
    ${task}
    </h3>
    <div>
    <span class="material-symbols-outlined" onclick='deleteTask(this)'> delete </span>
    </div>`;
    // <span class="material-symbols-outlined" onclick='editTast(this)'> edit </span>
  uncomplete.appendChild(uncomplete_li);
  inps[index].value = null;
  inps[index].focus();

  checkLists();
  movingToComplete();
};

btnsAdd.forEach((element, index) => {
  element.addEventListener("click", () => {
    let task = inps[index].value;
    if (task != "") {
      addToList(task, index);
    } else {
      element.disabled = true;
    }
  });
});

inps.forEach((element, index) => {
  element.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      let task = element.value;
      if (task != "") {
        addToList(task, index);
      } else {
        btnsAdd[index].disabled = true;
      }
    }
  });
});

///// moving to completed list /////

const movingToComplete = () => {
  const checkbox = document.querySelectorAll(".checkbox");
  checkbox.forEach((element) => {
    let taskName = element.parentElement;
    let innerLi = taskName.parentElement;

    let clicksCheckbox = 0;
    element.addEventListener("click", () => {
      if (clicksCheckbox % 2) {
        moveOutOfComplete(element);
        element.style.backgroundColor = "transparent";
        taskName.style.textDecoration = "none";
      } else {
        innerLi.remove();
        complete.appendChild(innerLi);
        element.style.backgroundColor = "var(--secondary-color)";
        taskName.style.textDecoration = "line-through";
      }
      clicksCheckbox++;
      checkLists();
    });
  });
};

///// moving out of completed list /////

const moveOutOfComplete = (element) => {
  let innerLi = element.parentElement.parentElement;
  innerLi.remove();
  uncomplete.appendChild(innerLi);
};

///// editing tasts /////

// function editTast(s) {
//   let task = s.parentElement.previousElementSibling.innerText;
//   task.setAttribute("contenteditable", true);
// }

///// deleting tasts /////

const deleteTask = (s) => {
  let li = s.parentElement.parentElement;
  li.classList.add("deleted");
  setTimeout(() => {
    li.remove();
    checkLists();
  }, 800);
};
