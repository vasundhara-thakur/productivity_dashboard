function openFeatures() {
  const allElems = document.querySelectorAll(".elem");
  const fullElemsPage = document.querySelectorAll(".fullelems");
  const FullElemsBackBtn = document.querySelectorAll(".fullelems .back");

  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      fullElemsPage[elem.id].style.display = "block";
    });
  });

  FullElemsBackBtn.forEach((back) => {
    back.addEventListener("click", () => {
      fullElemsPage[back.id].style.display = "none";
    });
  });
}
openFeatures();

function todoList() {
  const form = document.querySelector(".addTask form");
  const taskInput = document.querySelector(".addTask form input");
  const taskDetailsInput = document.querySelector(".addTask form textarea");
  const allTask = document.querySelector(".allTask");
  const task = document.querySelector(".allTask .tasks");

  let currTask = JSON.parse(localStorage.getItem("task")) || [];

  function renderTask() {
    let sum = "";
    currTask.forEach((elem, index) => {
      sum += `<div class="task">
              <div class="dets">
                <h4>${elem.taskName}</h4>
                <details>${elem.taskDetail}<summary></summary></details>
              </div>
              <div class="task-btns">
                <button class="completed btns" data-index="${index}">${
        elem.completed ? "Completed" : "Completed"
      }</button>
                            <button class="pending btns" data-index="${index}">${
        elem.pending ? "Pending" : "Pending"
      }</button>
                <button class="delete btns" data-index="${index}">Delete</button>
              </div>
          </div>`;
    });
    task.innerHTML = sum;

    const completedTask = document.querySelectorAll(".completed");
    const pendingTask = document.querySelectorAll(".pending");
    const deleteTask = document.querySelectorAll(".delete");

    completedTask.forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-index");
        currTask[idx].completed = true;
        currTask[idx].pending = false;
        saveTasks();
        renderTask();
      });
    });

    pendingTask.forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-index");
        currTask[idx].completed = false;
        currTask[idx].pending = true;
        saveTasks();
        renderTask();
      });
    });

    deleteTask.forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-index");
        currTask.splice(idx, 1);
        saveTasks();
        renderTask();
      });
    });

    completedTask.forEach((btn, i) => {
      btn.style.backgroundColor = currTask[i].completed ? "#27ae60" : "#ccc";
      btn.style.color = "#111111";
    });

    pendingTask.forEach((btn, i) => {
      btn.style.backgroundColor = currTask[i].pending ? "#f39c12" : "#ccc";
      btn.style.color = "#111111";
    });
  }

  renderTask();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let taskName = taskInput.value;
    let taskDetail = taskDetailsInput.value;

    const newTask = {
      taskName,
      taskDetail,
      pending: true,
      completed: false,
    };
    currTask.push(newTask);

    saveTasks();
    renderTask();

    e.target.reset();
  });

  function saveTasks() {
    localStorage.setItem("task", JSON.stringify(currTask));
  }
}
todoList();

function dailyPlanner() {
  const planner = document.querySelector(".day-planner");
  let dayData = JSON.parse(localStorage.getItem("dayData")) || {};

  let dayPlan = Array.from({ length: 18 }, (elem, idx) => `${6 + idx}:00`);

  let daySum = "";
  dayPlan.forEach(function (elem, idx) {
    let savedData = dayData[idx] || "";

    daySum += `<div class="planner-time">
            <p>${elem}</p>
            <input id=${idx} type="text" placeholder="...." value=${savedData}>
          </div>`;
  });
  planner.innerHTML = daySum;

  const input = document.querySelectorAll(".planner-time input");

  input.forEach(function (elem) {
    elem.addEventListener("input", () => {
      dayData[elem.id] = elem.value;

      localStorage.setItem("dayData", JSON.stringify(dayData));
    });
  });
}
dailyPlanner();

const quotes = document.querySelector(".quote-2 h4");
const author = document.querySelector(".quote-3 h2")
async function fetchQuotes() {
  const response = await fetch("https://motivational-spark-api.vercel.app/api/quotes/random");
  const data = await response.json();

  quotes.innerHTML = data.quote;
  author.innerHTML = data.author;
}

fetchQuotes();
