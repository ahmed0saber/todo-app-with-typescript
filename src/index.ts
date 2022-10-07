// TODO: filter by all, todo or completed
// TODO: alert if input is empty

type Task = {
    id: number
    title: string
    completed: boolean
    createdAt: string
}

const addTaskInput = document.querySelector<HTMLInputElement>(".input-group input")
const addTaskBtn = document.querySelector<HTMLButtonElement>(".input-group button")
const tasksContainer = document.querySelector<HTMLDivElement>(".tasks-container")
const filterTabs = document.querySelectorAll<HTMLButtonElement>(".filter-tab")
const tasks: Task[] = getTasksFromStorage()
tasks.forEach(addNewTask)

function getTasksFromStorage(): Task[] {
    const tasksAsJSON = localStorage.getItem("storedTasks")
    if (tasksAsJSON == null) return []
    return JSON.parse(tasksAsJSON)
}

function setTasksToStorage(): void {
    localStorage.setItem("storedTasks", JSON.stringify(tasks))
}

addTaskBtn?.addEventListener("click", () :void =>{
    if(addTaskInput?.value.trim() == "" || addTaskInput?.value == null) return

    const taskDate: Date = new Date()
    const newTask: Task = {
        id: tasks.length,
        title: addTaskInput.value,
        completed: false,
        createdAt: formatDate(taskDate),
    }
    tasks.push(newTask)
    setTasksToStorage()
    addNewTask(newTask)
    addTaskInput.value = ""
})

function addNewTask(task: Task): void {
    const taskItem = document.createElement("div")
    taskItem.classList.add("task")
    const taskText = document.createElement("div")
    taskText.classList.add("text-container")
    const taskTitle = document.createElement("p")
    taskTitle.textContent = task.title
    const taskDate = document.createElement("span")
    taskDate.textContent = task.createdAt
    const taskCheckbox = document.createElement("div")
    taskCheckbox.classList.add("checkbox")
    if (task.completed){
        taskCheckbox.classList.add("completed")
        taskItem.classList.add("completed-task")
    }
    taskCheckbox.addEventListener("click", (): void => {
        task.completed = !task.completed
        if (task.completed){
            taskCheckbox.classList.add("completed")
            taskItem.classList.add("completed-task")
        }
        else{
            taskCheckbox.classList.remove("completed")
            taskItem.classList.remove("completed-task")
        }
        setTasksToStorage()
    })
    taskText.append(taskTitle, taskDate)
    taskItem.append(taskText, taskCheckbox)
    tasksContainer?.append(taskItem)
}

function formatDate(givenDate: Date): string {
    const yyyy: number = givenDate.getFullYear()
    let mm: number|string = givenDate.getMonth() + 1
    let dd: number|string = givenDate.getDate()
    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm
    let seconds: number|string = givenDate.getSeconds()
    if (seconds < 10) seconds = '0' + seconds
    let minutes: number|string = givenDate.getMinutes()
    if (minutes < 10) minutes = '0' + minutes
    let hours: number|string = givenDate.getHours()
    let amOrPm: string
    if (hours >= 12) {
        hours -= 12
        amOrPm = "PM"
    }else{
        amOrPm = "AM"
    }
    if (hours < 10) hours = '0' + hours
    const formattedDate: string = `${hours}:${minutes}:${seconds}${amOrPm}, ${dd}/${mm}/${yyyy}`

    return formattedDate
}

filterTabs.forEach(filterTab => {
    filterTab.addEventListener("click", ()=>{
        filterTabs.forEach(tab => tab.classList.remove("active"))
        filterTab.classList.add("active")
        const filterIndicator = document.querySelector<HTMLSpanElement>(".filter-indicator span")
        if(filterIndicator != null && filterTab.dataset.tab != undefined){
            filterIndicator.style.marginLeft = `calc((100% / 3) * ${parseInt(filterTab.dataset.tab) - 1})`
            const availableFilters: string[] = ["show-all", "show-todo", "show-completed"]
            availableFilters.forEach((availableFilter) => tasksContainer?.classList.remove(availableFilter))
            tasksContainer?.classList.add(availableFilters[parseInt(filterTab.dataset.tab) - 1])
        }
    })
})