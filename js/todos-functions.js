const getSavedTodos = function () {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON !== null) {
        return JSON.parse(todosJSON);
    } else
        return [];
}
const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
}
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
        return searchTextMatch && hideCompletedMatch;
    })
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)
    document.querySelector("#todos").innerHTML = "";
    document.querySelector("#todos").appendChild(generateSummaryDOM(incompleteTodos));

    filteredTodos.forEach((todo) => {
        document.querySelector("#todos").appendChild(generateTodoDOM(todo));
    })
}
//remove todo
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
}
//toggles the completed value for a todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)
    if (todo !== undefined) {
        todo.completed = !todo.completed;
    }
}

const generateTodoDOM = (todo) => {
    const todoElement = document.createElement("div");
    const checkbox = document.createElement("input");
    const todoText = document.createElement("span");
    const removeButton = document.createElement("button");
    removeButton.addEventListener("click", (event) => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    });

    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = todo.completed;
    todoElement.appendChild(checkbox);
    checkbox.addEventListener("change", (event) => {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    })

    todoText.textContent = todo.text;
    todoElement.appendChild(todoText);

    removeButton.textContent = "x";
    todoElement.appendChild(removeButton);

    return todoElement;
}
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement("h2");
    summary.textContent = `You have ${incompleteTodos.length} todos left`;
    return summary;
}