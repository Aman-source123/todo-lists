let tasks = getTasks();


const taskForm =
    document.getElementById(
        "taskForm"
    );


const searchInput =
    document.getElementById(
        "searchTask"
    );


const statusFilter =
    document.getElementById(
        "statusFilter"
    );


const sortTasks =
    document.getElementById(
        "sortTasks"
    );



function renderTasks() {

    tasks =
        getTasks();


    const list =
        document.getElementById(
            "taskList"
        );


    const search =
        searchInput
            ?.value
            .toLowerCase()
            .trim() || "";


    const status =
        statusFilter
            ?.value || "all";


    const sort =
        sortTasks
            ?.value || "newest";


    let filtered =
        tasks.filter(task => {


            const matchesSearch =

                task.title
                    .toLowerCase()
                    .includes(search)

                ||

                task.category
                    .toLowerCase()
                    .includes(search)

                ||

                (task.notes || "")
                    .toLowerCase()
                    .includes(search);


            let matchesStatus = true;


            if (
                status === "active"
            ) {

                matchesStatus =
                    !task.completed;

            }


            if (
                status === "completed"
            ) {

                matchesStatus =
                    task.completed;

            }


            if (
                status === "overdue"
            ) {

                matchesStatus =
                    isOverdue(task);

            }


            if (
                status === "important"
            ) {

                matchesStatus =
                    task.favorite === true;

            }


            if (
                status === "pinned"
            ) {

                matchesStatus =
                    task.pinned === true;

            }


            return (
                matchesSearch
                &&
                matchesStatus
            );

        });



    /* SORT */

    if (
        sort === "newest"
    ) {

        filtered.sort(
            (a, b) =>
                b.createdAt -
                a.createdAt
        );

    }


    if (
        sort === "oldest"
    ) {

        filtered.sort(
            (a, b) =>
                a.createdAt -
                b.createdAt
        );

    }


    if (
        sort === "priority"
    ) {

        const priorityOrder = {

            High: 1,

            Medium: 2,

            Low: 3

        };


        filtered.sort(
            (a, b) =>
                priorityOrder[a.priority]
                -
                priorityOrder[b.priority]
        );

    }


    if (
        sort === "due"
    ) {

        filtered.sort(
            (a, b) => {

                const dateA =
                    a.dueDate || "9999-12-31";

                const dateB =
                    b.dueDate || "9999-12-31";


                return dateA.localeCompare(
                    dateB
                );

            }
        );

    }



    if (!filtered.length) {

        list.innerHTML = `

            <div class="empty-state">

                <h3>
                    No tasks found
                </h3>

                <p>
                    Add a task to get started.
                </p>

            </div>

        `;

        return;

    }



    list.innerHTML =
        filtered.map(task => {


            const overdue =
                isOverdue(task);


            return `

                <article class="task-card

                    ${
                        task.completed
                            ? "task-completed"
                            : ""
                    }

                    ${
                        task.pinned
                            ? "task-pinned"
                            : ""
                    }

                ">


                    <div class="task-check">

                        <button
                            onclick="toggleTask(${task.id})"
                            class="check-btn"
                            title="Complete"
                        >

                            ${
                                task.completed
                                    ? "✓"
                                    : ""
                            }

                        </button>

                    </div>



                    <div class="task-content">


                        <div class="task-title-row">

                            <h3>

                                ${escapeHTML(
                                    task.title
                                )}

                            </h3>


                            ${
                                task.pinned
                                    ? "<span>📌</span>"
                                    : ""
                            }


                            ${
                                task.favorite
                                    ? "<span>⭐</span>"
                                    : ""
                            }

                        </div>



                        <div class="task-meta">


                            <span class="category">

                                ${escapeHTML(
                                    task.category
                                )}

                            </span>



                            <span
                                class="
                                    priority
                                    ${task.priority.toLowerCase()}
                                "
                            >

                                ${escapeHTML(
                                    task.priority
                                )}

                            </span>



                            ${
                                task.dueDate
                                    ? `

                                        <span
                                            class="${
                                                overdue
                                                    ? "overdue"
                                                    : ""
                                            }"
                                        >

                                            📅
                                            ${task.dueDate}

                                        </span>

                                    `
                                    : ""
                            }


                        </div>



                        ${
                            task.notes
                                ? `

                                    <p class="task-notes">

                                        ${escapeHTML(
                                            task.notes
                                        )}

                                    </p>

                                `
                                : ""
                        }


                    </div>



                    <div class="task-actions">


                        <button
                            onclick="toggleFavorite(${task.id})"
                            title="Favorite"
                        >

                            ${
                                task.favorite
                                    ? "⭐"
                                    : "☆"
                            }

                        </button>



                        <button
                            onclick="togglePin(${task.id})"
                            title="Pin"
                        >

                            ${
                                task.pinned
                                    ? "📌"
                                    : "📍"
                            }

                        </button>



                        <button
                            onclick="editTask(${task.id})"
                            title="Edit"
                        >
                            ✏️
                        </button>



                        <button
                            onclick="deleteTask(${task.id})"
                            title="Delete"
                        >
                            🗑️
                        </button>


                    </div>


                </article>

            `;

        }).join("");

}



/* ADD / UPDATE */

taskForm?.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const title =
            document
                .getElementById(
                    "taskTitle"
                )
                .value
                .trim();


        const category =
            document.getElementById(
                "taskCategory"
            ).value;


        const priority =
            document.getElementById(
                "taskPriority"
            ).value;


        const dueDate =
            document.getElementById(
                "taskDueDate"
            ).value;


        const notes =
            document
                .getElementById(
                    "taskNotes"
                )
                .value
                .trim();


        const editId =
            document.getElementById(
                "editId"
            ).value;



        if (editId) {


            const index =
                tasks.findIndex(
                    task =>
                        task.id == editId
                );


            if (index !== -1) {

                tasks[index].title =
                    title;

                tasks[index].category =
                    category;

                tasks[index].priority =
                    priority;

                tasks[index].dueDate =
                    dueDate;

                tasks[index].notes =
                    notes;

            }


        } else {


            const newTask = {

                id: Date.now(),

                title,

                category,

                priority,

                dueDate,

                notes,

                completed: false,

                favorite: false,

                pinned: false,

                createdAt: Date.now(),

                completedAt: null

            };


            tasks.push(
                newTask
            );

        }


        saveTasks(tasks);


        taskForm.reset();


        document.getElementById(
            "editId"
        ).value = "";


        document.getElementById(
            "taskSubmitBtn"
        ).textContent =
            "Add Task";


        renderTasks();

    }
);



/* SEARCH */

searchInput?.addEventListener(
    "input",
    renderTasks
);


statusFilter?.addEventListener(
    "change",
    renderTasks
);


sortTasks?.addEventListener(
    "change",
    renderTasks
);



/* COMPLETE */

function toggleTask(id) {

    tasks =
        getTasks();


    const task =
        tasks.find(
            item =>
                item.id === id
        );


    if (!task) return;


    task.completed =
        !task.completed;


    task.completedAt =
        task.completed
            ? Date.now()
            : null;


    saveTasks(tasks);


    renderTasks();

}



/* FAVORITE */

function toggleFavorite(id) {

    tasks =
        getTasks();


    const task =
        tasks.find(
            item =>
                item.id === id
        );


    if (!task) return;


    task.favorite =
        !task.favorite;


    saveTasks(tasks);


    renderTasks();

}



/* PIN */

function togglePin(id) {

    tasks =
        getTasks();


    const task =
        tasks.find(
            item =>
                item.id === id
        );


    if (!task) return;


    task.pinned =
        !task.pinned;


    saveTasks(tasks);


    renderTasks();

}



/* DELETE */

function deleteTask(id) {

    const confirmDelete =
        confirm(
            "Delete this task?"
        );


    if (!confirmDelete) return;


    tasks =
        getTasks().filter(
            task =>
                task.id !== id
        );


    saveTasks(tasks);


    renderTasks();

}



/* EDIT */

function editTask(id) {

    const task =
        getTasks().find(
            item =>
                item.id === id
        );


    if (!task) return;


    document.getElementById(
        "editId"
    ).value =
        task.id;


    document.getElementById(
        "taskTitle"
    ).value =
        task.title;


    document.getElementById(
        "taskCategory"
    ).value =
        task.category;


    document.getElementById(
        "taskPriority"
    ).value =
        task.priority;


    document.getElementById(
        "taskDueDate"
    ).value =
        task.dueDate || "";


    document.getElementById(
        "taskNotes"
    ).value =
        task.notes || "";


    document.getElementById(
        "taskSubmitBtn"
    ).textContent =
        "Update Task";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



renderTasks();