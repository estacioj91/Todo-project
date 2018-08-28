let todos = getSavedTodos();
const filters = {
    searchText: "",
    hideCompleted: false
}
renderTodos(todos, filters);

document.querySelector("#searchText").addEventListener('input',  (event) => {
    filters.searchText = event.target.value;
    renderTodos(todos, filters);
})
document.querySelector("#new-todo").addEventListener(
    "submit",
     (event) =>{
        event.preventDefault();
        todos.push({
            id: uuidv4(),
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
    "change", (event)=>{
        filters.hideCompleted = event.target.checked;
        renderTodos(todos,filters);
    }
)