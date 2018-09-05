"use strict"

let todos = getSavedTodos();
const filters = {
    searchText: "",
    hideCompleted: false
}
renderTodos(todos, filters);

document.querySelector("#searchText").addEventListener('input', (event) => {
    filters.searchText = event.target.value;
    renderTodos(todos, filters);
})
document.querySelector("#new-todo").addEventListener(
    "submit",
    (event) => {
        const text = event.target.elements.text.value.trim();
        event.preventDefault();
        if (text.length > 0) {
            todos.push({
                id: uuidv4(),
                text,
                completed: false
            });
            saveTodos(todos);
            renderTodos(todos, filters);
            //clears form
            event.target.elements.text.value = ""
        }


    }
)
document.querySelector("#hide-completed").addEventListener(
    "change", (event) => {
        filters.hideCompleted = event.target.checked;
        renderTodos(todos, filters);
    }
)