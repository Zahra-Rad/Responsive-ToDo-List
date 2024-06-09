const btnsAdd = document.querySelectorAll(".addToList");
const inps = document.querySelectorAll(".inp");
const uncomplete = document.querySelector("#uncompleted_list");
const complete = document.querySelector("#completed_list");
const remainingTasks = document.querySelector("#remaining");
const total = document.querySelector("#total");
const done = document.querySelector("#done");
const addBtn = document.querySelector("#add");

const inpSearch = document.querySelector("#search");

///// local storage /////

let data = [];

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

  uncomplete_li.setAttribute("data-status", "uncomplete");

  addToStorage(index, uncomplete_li);

  uncomplete.appendChild(uncomplete_li);
  inps[index].value = null;
  inps[index].focus();

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
  checkbox.forEach((element, index) => {
    let taskName = element.parentElement;
    let innerLi = taskName.parentElement;
    let clicksCheckbox;
    innerLi.getAttribute("data-status") == "uncomplete"
      ? (clicksCheckbox = 0)
      : (clicksCheckbox = 1);
    element.addEventListener("click", () => {
      let data = JSON.parse(localStorage.getItem("todoStorage"));
      if (clicksCheckbox % 2) {
        moveOutOfComplete(element);
        element.style.backgroundColor = "transparent";
        taskName.style.textDecoration = "none";
        innerLi.setAttribute("data-status", "uncomplete");
        const temp = {
          flag: index,
          val: data[index].val,
          status: "uncomplete",
        };
        data.splice(index, 1, temp);
        localStorage.setItem("todoStorage", JSON.stringify(data));
      } else {
        innerLi.setAttribute("data-status", "complete");
        innerLi.remove();
        complete.appendChild(innerLi);
        element.style.backgroundColor = "var(--secondary-color)";
        taskName.style.textDecoration = "line-through";
        const temp = {
          flag: index,
          val: data[index].val,
          status: "complete",
        };
        data.splice(index, 1, temp);
        localStorage.setItem("todoStorage", JSON.stringify(data));
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
  innerLi.setAttribute("data-status", "uncomplete");
};

///// deleting tasts /////

const deleteTask = (s) => {
  // const _allLi = document.querySelectorAll("section li");
  let li = s.parentElement.parentElement;
  let data = JSON.parse(localStorage.getItem("todoStorage"));
  data.forEach((task, index) => {
    if (task.val == li.children[0].innerText) {
      if (data[index].status == "uncomplete") {
        data[index].status = "deleted-uncomplet";
        li.setAttribute("data-status", "deleted-uncomplet");
      } else if (data[index].status == "complete") {
        data[index].status = "deleted-complete";
        li.setAttribute("data-status", "deleted-complete");
      }
      localStorage.setItem("todoStorage", JSON.stringify(data));
    }
  });
  li.classList.add("deleted");
  setTimeout(() => {
    li.remove();
    checkLists();
    tasksCalc();
  }, 800);
};

///// desplay tasks numbers /////

const tasksCalc = () => {
  const _li = document.querySelectorAll("section li");
  const uncompleteTasks = Array.from(_li).filter(
    (li) => li.getAttribute("data-status") == "uncomplete"
  );
  const completeTasks = Array.from(_li).filter(
    (li) => li.getAttribute("data-status") == "complete"
  );
  remaining.innerHTML = uncompleteTasks.length;
  done.innerHTML = completeTasks.length;
  total.innerHTML = uncompleteTasks.length + completeTasks.length;
};

///// add to local storage /////

let flag = 0;

if (localStorage.getItem("todoStorage") != null) {
  data = JSON.parse(localStorage.getItem("todoStorage"));
  data.map((x, i) => {
    if (x.status == "deleted-uncomplet") {
      let uncomplete_li = document.createElement("li");
      uncomplete_li.innerHTML = `<h3>
      <span class="checkbox"></span>
      ${x.val}
      </h3>
      <div>
      <span class="material-symbols-outlined" onclick='deleteTask(this)'> delete </span>
      </div>`;
      uncomplete_li.setAttribute("data-status", "deleted-uncomplet");
      uncomplete_li.style.display = "none";
      uncomplete.appendChild(uncomplete_li);
    } else if (x.status == "deleted-complete") {
      let complete_li = document.createElement("li");
      complete_li.innerHTML = `<h3>
        <span class="checkbox"></span>
        ${x.val}
        </h3>
        <div>
        <span class="material-symbols-outlined" onclick='deleteTask(this)'> delete </span>
        </div>`;
      complete_li.setAttribute("data-status", "deleted-complete");
      complete.appendChild(complete_li);
      complete_li.style.display = "none";
    } else if (x.status == "uncomplete") {
      let uncomplete_li = document.createElement("li");
      uncomplete_li.innerHTML = `<h3>
      <span class="checkbox"></span>
      ${x.val}
      </h3>
      <div>
      <span class="material-symbols-outlined" onclick='deleteTask(this)'> delete </span>
      </div>`;
      uncomplete_li.setAttribute("data-status", "uncomplete");
      uncomplete.appendChild(uncomplete_li);
    } else {
      let complete_li = document.createElement("li");
      complete_li.innerHTML = `<h3>
        <span class="checkbox"></span>
        ${x.val}
        </h3>
        <div>
        <span class="material-symbols-outlined" onclick='deleteTask(this)'> delete </span>
        </div>`;
      complete_li.setAttribute("data-status", "complete");
      complete.appendChild(complete_li);
    }
    let checkbox = document.querySelectorAll(".checkbox");

    if (x.status == "complete") {
      checkbox[i].style.backgroundColor = "var(--secondary-color)";
      checkbox[i].parentElement.style.textDecoration = "line-through";
    }

    movingToComplete();
    checkLists();
    tasksCalc();
    flag = data.length;
  });
}

const addToStorage = (index, li) => {
  let stat = li.getAttribute("data-status");
  const temp = {
    flag: flag,
    val: inps[index].value,
    status: stat,
  };
  data.push(temp);
  localStorage.setItem("todoStorage", JSON.stringify(data));
  flag++;
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
  clicks++;
});

///// searching section /////

inpSearch.addEventListener("input", (e) => {
  const _li = document.querySelectorAll("section li");
  let searchValue = e.target.value;

  _li.forEach((li) => {
    if (li.children[0].innerText.indexOf(searchValue) == -1) {
      li.style.display = "none";
    } else {
      li.style.display = "flex";
    }
  });
});
