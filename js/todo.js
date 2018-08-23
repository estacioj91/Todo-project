const todos = [{
        text: "Order cat food",
        completed: false
    },
    {
        text: "Clean kitchen",
        completed: true
    },
    {
        text: "Buy food",
        completed: true
    },
    {
        text: "Exercise",
        completed: true
    },
    {
        text: "Do work",
        completed: false
    },
]
const filters = {
    searchText: ""
}
const renderTodos =  function(todos, filters){
    const filteredTodos = todos.filter(function (todo){
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    })
    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed;
    })
    document.querySelector("#todos").innerHTML = "";
    const summary = document.createElement("h2");
    summary.textContent = `You have ${incompleteTodos.length} todos left`;
    document.querySelector("#todos").appendChild(summary);
    
    filteredTodos.forEach(function (todo) {
        const p = document.createElement("p");
        p.textContent = todo.text;
        document.querySelector("#todos").appendChild(p);
    })
}

renderTodos(todos, filters);

document.querySelector("#add-todo").addEventListener("click", function (event) {

})
document.querySelector("#new-todo").addEventListener("input", function(event){
    const p = document.createElement("p");
    p.textContent = event.target.value;
    document.querySelector("body").appendChild(p);
});
document.querySelector("#searchText").addEventListener('input', function(event){
    filters.searchText = event.target.value;
    renderTodos(todos,filters);
})