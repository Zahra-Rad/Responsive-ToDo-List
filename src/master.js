const btnsAdd = document.querySelectorAll(".addToList");
const inps = document.querySelectorAll(".inp");
const uncomplete = document.querySelector("#uncompleted_list");
const complete = document.querySelector("#completed_list");
const remainingTasks = document.querySelector("#remaining");
const total = document.querySelector("#total");
const done = document.querySelector("#done");
const addBtn = document.querySelector("#add");

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

  ///// close input area in mobile devices /////
  addBtn.classList.remove("hidden");
  addBtn.nextElementSibling.classList.add("hidden");
  addBtn.parentElement.previousElementSibling.classList.add("hidden");
  addBtn.parentElement.parentElement.style.width = "30px";

  // addBtn.nextElementSibling.addEventListener("click", () => {
  //   addBtn.classList.remove("hidden");
  //   addBtn.nextElementSibling.classList.add("hidden");
  //   addBtn.parentElement.previousElementSibling.classList.add("hidden");
  //   addBtn.parentElement.parentElement.style.width = "30px";
  // });
  ///// close input area in mobile devices /////

  checkLists();
  movingToComplete();
  tasksCalc();
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
      tasksCalc();
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
    tasksCalc();
  }, 800);
};

///// desplay tasks numbers /////

const tasksCalc = () => {
  remaining.innerHTML = uncomplete.children.length;
  done.innerHTML = complete.children.length;
  total.innerHTML = uncomplete.children.length + complete.children.length;
};

///// desplay date /////

const time = document.querySelector("#time");
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let date = new Date();

time.innerHTML = `${days[date.getDay()]}, ${
  months[date.getMonth()]
} ${date.getDate()}`;

///// mobile size open input area /////

let clicks = 1;

addBtn.parentElement.addEventListener("click", () => {
  if (clicks % 2) {
    addBtn.classList.add("hidden");
    addBtn.nextElementSibling.classList.remove("hidden");
    addBtn.parentElement.previousElementSibling.classList.remove("hidden");
    addBtn.parentElement.parentElement.style.width = "300px";
  } else {
    addBtn.classList.remove("hidden");
    addBtn.nextElementSibling.classList.add("hidden");
    addBtn.parentElement.previousElementSibling.classList.add("hidden");
    addBtn.parentElement.parentElement.style.width = "30px";
  }
  clicks++
});
