function openFeatures() {
  const allElems = document.querySelectorAll(".elem");
  const fullElemsPage = document.querySelectorAll(".fullelems");
  const FullElemsBackBtn = document.querySelectorAll(".fullelems .back");

  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      fullElemsPage[elem.id].style.display = "block";
      allElems.forEach(e => e.style.display = "none");
    });
  });

  FullElemsBackBtn.forEach((back) => {
    back.addEventListener("click", () => {
      fullElemsPage[back.id].style.display = "none";
      allElems.forEach(e => e.style.display = "block");
    });
  });
}
openFeatures();

// weather
function weatherApi() {
  let fulldate = document.querySelector(".header1 h2");
  let dayTime = document.querySelector(".header1 h1");
  let temp = document.querySelector(".header2 .temp");
  let condition = document.querySelector(".header2 .condition");
  let humidity = document.querySelector(".header2 .humidity");
  let wind = document.querySelector(".header2 .wind");
  let data = null;

  const apiKey = "bee21bcb40eee19046561a80dda06f75";
const city = "Indore";

async function weatherAPICall() {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  );

  const data = await res.json();

  temp.innerHTML = `${data.main.temp} °C`;
  condition.innerHTML = data.weather[0].description;
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
  wind.innerHTML = `Wind: ${data.wind.speed} m/s`;
}
weatherAPICall();

  function currDayTime() {
    let date = new Date();

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let dayOfWeek = days[date.getDay()];
    let currDate = date.getDate();
    let monthOfYear = months[date.getMonth()];
    let year = date.getFullYear();

    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, "0");

    let period = hours >= 12 ? "PM" : "AM";
    let displayHours = hours % 12 || 12;

    fulldate.innerHTML = `${currDate} ${monthOfYear}, ${year}`;
    dayTime.innerHTML = `${dayOfWeek}, ${displayHours}:${minutes} ${period}`;
  }
  currDayTime();
  setInterval(currDayTime, 1000);
}
weatherApi();

// todo
function todoList() {
  const form = document.querySelector(".addTask form");
  const taskInput = document.querySelector(".addTask form input");
  const taskDetailsInput = document.querySelector(".addTask form textarea");
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
      btn.style.backgroundColor = currTask[i].completed
        ? "var(--green)"
        : "#ccc";
      btn.style.color = "#111111";
    });

    pendingTask.forEach((btn, i) => {
      btn.style.backgroundColor = currTask[i].pending ? "var(--must)" : "#ccc";
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

// dailyPlanner
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

// quotes
function motivationalQuotes() {
  const quotes = document.querySelector(".quote-2 h4");
  const author = document.querySelector(".quote-3 h2");
  async function fetchQuotes() {
    const response = await fetch(
      "https://motivational-spark-api.vercel.app/api/quotes/random"
    );
    const data = await response.json();

    quotes.innerHTML = data.quote;
    author.innerHTML = data.author;
  }

  fetchQuotes();
}
motivationalQuotes();

// timer
function pomodoroTimer() {
  let totalSeconds = 25 * 60;
  let timer = document.querySelector(".pomo-timer h2");
  let startBtn = document.querySelector(".pomo-timer .start-timer");
  let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  let resetBtn = document.querySelector(".pomo-timer .reset-timer");
  let session = document.querySelector(".timer .session");
  let startInterval = null;
  let isWorkSession = true;

  function updateTime() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }

  function startTimer() {
    clearInterval(startInterval);
    if (isWorkSession) {
      startInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTime();
        } else {
          isWorkSession = false;
          clearInterval(startInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          session.style.backgroundColor = "var(--must)";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      startInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTime();
        } else {
          isWorkSession = true;
          clearInterval(startInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Working Time";
          session.style.backgroundColor = "var(--green)";
          totalSeconds = 25 * 60;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(startInterval);
  }

  function resetTimer() {
    clearInterval(startInterval);
    totalSeconds = 25 * 60;
    updateTime();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomodoroTimer();

// goals
function dailyGoals() {
  const goalInput = document.querySelector(".add-goal input");
  const addGoalBtn = document.querySelector(".add-goal button");
  const allGoals = document.querySelector(".right .new-goals");

  let currgoal = JSON.parse(localStorage.getItem("allGoals")) || [];

  function rendergoal() {
    let sum = "";
    currgoal.forEach((elem, index) => {
      sum += `
        <div class="added">
        <label class="goal">
          <input type="checkbox" ${
            elem.completed ? "checked" : ""
          } data-index="${index}">
          <span></span>
          <h2>${elem.goalName}</h2>
        </label>
        <button class="delete" data-index="${index}">✕</button></div>
      `;
    });
    allGoals.innerHTML = sum;
  }
  rendergoal();

  addGoalBtn.addEventListener("click", () => {
    const goalName = goalInput.value.trim();
    if (!goalName) return;

    currgoal.push({
      goalName,
      completed: false,
    });

    saveGoals();
    rendergoal();
    goalInput.value = "";
  });

  function saveGoals() {
    localStorage.setItem("allGoals", JSON.stringify(currgoal));
  }

  allGoals.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
      const index = e.target.dataset.index;
      currgoal[index].completed = e.target.checked;
      saveGoals();
    }
  });

  allGoals.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const index = e.target.dataset.index;
      currgoal.splice(index, 1);
      saveGoals();
      rendergoal();
    }
  });
}
dailyGoals();
