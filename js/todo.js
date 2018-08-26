let todos = getSavedTodos();
const filters = {
    searchText: "",
    hideCompleted: false
}
renderTodos(todos, filters);

document.querySelector("#searchText").addEventListener('input', function (event) {
    filters.searchText = event.target.value;
    renderTodos(todos, filters);
})
document.querySelector("#new-todo").addEventListener(
    "submit",
    function (event) {
        event.preventDefault();
        todos.push({
            text: event.target.elements.text.value,
            completed: false
        });
        saveTodos(todos);
        renderTodos(todos,filters);
        //clears form
        event.target.elements.text.value = ""
    }
)
document.querySelector("#hide-completed").addEventListener(
    "change", function(event){
        filters.hideCompleted = event.target.checked;
        renderTodos(todos,filters);
    }
)