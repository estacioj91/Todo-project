"use strict"
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem("todos");
    try {
        return todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e) {
        return [];
    }
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
    const todoElement = document.querySelector("#todos");
    todoElement.innerHTML = "";
    todoElement.appendChild(generateSummaryDOM(incompleteTodos));


    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoElement.appendChild(generateTodoDOM(todo));
        })
    } else {
        const messageElement = document.createElement("p");
        messageElement.classList.add("empty-message");
        messageElement.textContent = "No to-dos to show";
        todoElement.appendChild(messageElement);
    }
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
    if (todo) {
        todo.completed = !todo.completed;
    }
}

const generateTodoDOM = (todo) => {
    const todoElement = document.createElement("label");
    const containerElement = document.createElement("div");
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
    containerElement.appendChild(checkbox);
    checkbox.addEventListener("change", (event) => {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    })

    todoText.textContent = todo.text;
    containerElement.appendChild(todoText);
    todoElement.classList.add("list-item");
    containerElement.classList.add("list-item__container");
    todoElement.appendChild(containerElement);

    removeButton.textContent = "remove";
    removeButton.classList.add("button", "button--text");
    todoElement.appendChild(removeButton);

    return todoElement;
}
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement("h2");
    const plural = incompleteTodos.length === 1 ? "" : "s";
    summary.classList.add("list-title");
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`;
    return summary;
}