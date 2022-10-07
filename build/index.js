"use strict";
const addTaskInput = document.querySelector(".input-group input");
const addTaskBtn = document.querySelector(".input-group button");
const tasksContainer = document.querySelector(".tasks-container");
const filterTabs = document.querySelectorAll(".filter-tab");
const tasks = getTasksFromStorage();
tasks.forEach(addNewTask);
function getTasksFromStorage() {
    const tasksAsJSON = localStorage.getItem("storedTasks");
    if (tasksAsJSON == null)
        return [];
    return JSON.parse(tasksAsJSON);
}
function setTasksToStorage() {
    localStorage.setItem("storedTasks", JSON.stringify(tasks));
}
addTaskBtn === null || addTaskBtn === void 0 ? void 0 : addTaskBtn.addEventListener("click", () => {
    if ((addTaskInput === null || addTaskInput === void 0 ? void 0 : addTaskInput.value.trim()) == "" || (addTaskInput === null || addTaskInput === void 0 ? void 0 : addTaskInput.value) == null)
        return;
    const taskDate = new Date();
    const newTask = {
        id: tasks.length,
        title: addTaskInput.value,
        completed: false,
        createdAt: formatDate(taskDate),
    };
    tasks.push(newTask);
    setTasksToStorage();
    addNewTask(newTask);
    addTaskInput.value = "";
});
function addNewTask(task) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    const taskText = document.createElement("div");
    taskText.classList.add("text-container");
    const taskTitle = document.createElement("p");
    taskTitle.textContent = task.title;
    const taskDate = document.createElement("span");
    taskDate.textContent = task.createdAt;
    const taskCheckbox = document.createElement("div");
    taskCheckbox.classList.add("checkbox");
    if (task.completed) {
        taskCheckbox.classList.add("completed");
        taskItem.classList.add("completed-task");
    }
    taskCheckbox.addEventListener("click", () => {
        task.completed = !task.completed;
        if (task.completed) {
            taskCheckbox.classList.add("completed");
            taskItem.classList.add("completed-task");
        }
        else {
            taskCheckbox.classList.remove("completed");
            taskItem.classList.remove("completed-task");
        }
        setTasksToStorage();
    });
    taskText.append(taskTitle, taskDate);
    taskItem.append(taskText, taskCheckbox);
    tasksContainer === null || tasksContainer === void 0 ? void 0 : tasksContainer.append(taskItem);
}
function formatDate(givenDate) {
    const yyyy = givenDate.getFullYear();
    let mm = givenDate.getMonth() + 1;
    let dd = givenDate.getDate();
    if (dd < 10)
        dd = '0' + dd;
    if (mm < 10)
        mm = '0' + mm;
    let seconds = givenDate.getSeconds();
    if (seconds < 10)
        seconds = '0' + seconds;
    let minutes = givenDate.getMinutes();
    if (minutes < 10)
        minutes = '0' + minutes;
    let hours = givenDate.getHours();
    let amOrPm;
    if (hours >= 12) {
        hours -= 12;
        amOrPm = "PM";
    }
    else {
        amOrPm = "AM";
    }
    if (hours < 10)
        hours = '0' + hours;
    const formattedDate = `${hours}:${minutes}:${seconds}${amOrPm}, ${dd}/${mm}/${yyyy}`;
    return formattedDate;
}
filterTabs.forEach(filterTab => {
    filterTab.addEventListener("click", () => {
        filterTabs.forEach(tab => tab.classList.remove("active"));
        filterTab.classList.add("active");
        const filterIndicator = document.querySelector(".filter-indicator span");
        if (filterIndicator != null && filterTab.dataset.tab != undefined) {
            filterIndicator.style.marginLeft = `calc((100% / 3) * ${parseInt(filterTab.dataset.tab) - 1})`;
            const availableFilters = ["show-all", "show-todo", "show-completed"];
            availableFilters.forEach((availableFilter) => tasksContainer === null || tasksContainer === void 0 ? void 0 : tasksContainer.classList.remove(availableFilter));
            tasksContainer === null || tasksContainer === void 0 ? void 0 : tasksContainer.classList.add(availableFilters[parseInt(filterTab.dataset.tab) - 1]);
        }
    });
});
