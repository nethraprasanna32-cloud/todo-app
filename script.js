let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStats() {
    document.getElementById("totalCount").innerText = tasks.length + " tasks";
    const completed = tasks.filter(t => t.completed).length;
    document.getElementById("completedCount").innerText = completed + " done";
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let filtered = tasks;

    if (currentFilter === "active")
        filtered = tasks.filter(t => !t.completed);

    if (currentFilter === "completed")
        filtered = tasks.filter(t => t.completed);

    filtered.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <div class="task-left" onclick="toggleTask(${index})">
                ${task.text}
                <div style="font-size:12px; opacity:0.6;">
                    ${task.category}
                </div>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})">❌</button>
        `;

        list.appendChild(li);
    });

    updateStats();
}

function addTask() {
    const text = document.getElementById("taskInput").value;
    const category = document.getElementById("category").value;

    if (!text.trim()) return;

    tasks.push({ text, category, completed: false });
    document.getElementById("taskInput").value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function setFilter(filter) {
    currentFilter = filter;
    renderTasks();
}

renderTasks();