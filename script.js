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
          session.style.backgroundColor = "var(--pri)";
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
          session.style.backgroundColor = "var(--sec)";
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

let fulldate = document.querySelector(".header1 h2");
let dayTime = document.querySelector(".header1 h1");
let temp = document.querySelector(".header2 h2");
let condition = document.querySelector(".header2 .condition");
let humidity = document.querySelector(".header2 .humidity");
let wind = document.querySelector(".header2 .wind");
let data = null;

async function weatherAPICall() {
  const apiKey = `742e0da1c5c94345a55144813252712`;
  let city = "indore";
  let res = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  );

  data = await res.json();
   console.log(data.current)

   temp.innerHTML = `${data.current.temp_c} °C`;
   condition.innerHTML = ` ${data.current.condition.text}`;
   humidity.innerHTML = `Humidity: ${data.current.humidity}`;
   wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
}
weatherAPICall();

function currDayTime() {
  let date = new Date();

  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
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

