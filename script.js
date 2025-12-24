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