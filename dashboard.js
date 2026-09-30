const dashboardTasks =
    getTasks();



/* =========================
   STATS
========================= */

const total =
    dashboardTasks.length;


const completed =
    dashboardTasks.filter(
        task =>
            task.completed
    ).length;


const active =
    dashboardTasks.filter(
        task =>
            !task.completed
    ).length;


const overdue =
    dashboardTasks.filter(
        task =>
            isOverdue(task)
    ).length;



document.getElementById(
    "totalTasks"
).textContent =
    total;


document.getElementById(
    "activeTasks"
).textContent =
    active;


document.getElementById(
    "completedTasks"
).textContent =
    completed;


document.getElementById(
    "overdueTasks"
).textContent =
    overdue;



/* =========================
   WELCOME
========================= */

const user =
    getCurrentUser();


if (user) {

    document.getElementById(
        "welcomeText"
    ).textContent =
        `Welcome back, ${user.name}!`;

}



/* =========================
   PROGRESS
========================= */

const percentage =
    total
        ? Math.round(
            (completed / total) * 100
        )
        : 0;


document.getElementById(
    "progressCircle"
).textContent =
    `${percentage}%`;



document.getElementById(
    "progressCircleBox"
).style.background =
    `conic-gradient(
        var(--primary) ${percentage * 3.6}deg,
        #e5e7eb ${percentage * 3.6}deg
    )`;



/* =========================
   CATEGORY
========================= */

const categories = {};


dashboardTasks.forEach(
    task => {

        categories[task.category] =
            (
                categories[
                    task.category
                ] || 0
            ) + 1;

    }
);


const categoryContainer =
    document.getElementById(
        "categoryChart"
    );


if (
    !Object.keys(categories).length
) {

    categoryContainer.innerHTML = `

        <p class="muted">
            No category data yet.
        </p>

    `;

} else {


    categoryContainer.innerHTML =
        Object.entries(categories)
            .map(
                ([category, count]) => {

                    const width =
                        total
                            ? (
                                count /
                                total
                            ) * 100
                            : 0;


                    return `

                        <div class="category-row">


                            <div>

                                <span>

                                    ${escapeHTML(
                                        category
                                    )}

                                </span>


                                <strong>
                                    ${count}
                                </strong>

                            </div>


                            <div class="bar">

                                <div
                                    style="
                                        width:${width}%;
                                    "
                                ></div>

                            </div>


                        </div>

                    `;

                }
            )
            .join("");

}



/* =========================
   RECENT TASKS
========================= */

const recent =
    [...dashboardTasks]

        .sort(
            (a, b) =>
                b.createdAt -
                a.createdAt
        )

        .slice(
            0,
            5
        );


const recentContainer =
    document.getElementById(
        "recentTasks"
    );


if (!recent.length) {

    recentContainer.innerHTML = `

        <div class="empty-state">

            <p>
                No tasks available.
            </p>

        </div>

    `;

} else {


    recentContainer.innerHTML =
        recent
            .map(
                task => `

                    <div class="recent-task">


                        <div>

                            <strong>

                                ${escapeHTML(
                                    task.title
                                )}

                            </strong>


                            <small>

                                ${escapeHTML(
                                    task.category
                                )}

                            </small>

                        </div>


                        <span
                            class="${
                                task.completed
                                    ? "status-done"
                                    : "status-active"
                            }"
                        >

                            ${
                                task.completed
                                    ? "Completed"
                                    : "Active"
                            }

                        </span>


                    </div>

                `
            )
            .join("");

}



/* =========================
   WEEKLY CHART
========================= */

function renderWeeklyChart() {

    const container =
        document.getElementById(
            "weeklyChart"
        );


    if (!container) return;


    const tasks =
        getTasks();


    const today =
        new Date();


    const week = [];


    for (
        let i = 6;
        i >= 0;
        i--
    ) {

        const date =
            new Date(today);


        date.setDate(
            today.getDate() - i
        );


        const dateString =
            `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}-${String(
                date.getDate()
            ).padStart(2, "0")}`;


        const completed =
            tasks.filter(
                task => {

                    if (
                        !task.completedAt
                    ) {

                        return false;

                    }


                    const completedDate =
                        new Date(
                            task.completedAt
                        );


                    const completedString =
                        `${completedDate.getFullYear()}-${String(
                            completedDate.getMonth() + 1
                        ).padStart(2, "0")}-${String(
                            completedDate.getDate()
                        ).padStart(2, "0")}`;


                    return (
                        completedString ===
                        dateString
                    );

                }
            ).length;


        week.push({

            date,

            completed

        });

    }


    const max =
        Math.max(
            ...week.map(
                day =>
                    day.completed
            ),
            1
        );


    container.innerHTML =
        week
            .map(
                day => {

                    const height =
                        Math.max(
                            5,
                            (
                                day.completed /
                                max
                            ) * 160
                        );


                    const label =
                        day.date.toLocaleDateString(
                            "en-US",
                            {
                                weekday:
                                    "short"
                            }
                        );


                    return `

                        <div class="chart-column">


                            <strong>
                                ${day.completed}
                            </strong>


                            <div
                                class="chart-bar"
                                style="
                                    height:${height}px;
                                "
                            ></div>


                            <span>
                                ${label}
                            </span>


                        </div>

                    `;

                }
            )
            .join("");

}


renderWeeklyChart();