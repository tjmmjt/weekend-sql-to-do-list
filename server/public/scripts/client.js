console.log('JS is sourced!');

// ! Create Handlers
// get handler
function handleGet() {
    axios.get('/todos').then((response) => {
        console.log("GET todos:", response.data);
        render(response.data)
    }) .catch((error) =>{
        console.log("Axios GET error:", error);
    })
}

// ! Create Render
// render todo items to DOM
function render(todoItems) {
    // declare todoList, initialize with DOM id
    let todoList = document.getElementById('todoList')
    // prevent stacking duplicates by setting innerhtml to empty string
    todoList.innerHTML = ''
    // loop through todoItems param and append each item to DOM
    for(let item of todoItems){
        // wasn't appending, looked at other assignments and added parentheses?
        todoList.innerHTML += (`
        <tr dataset-id="${item.id}" dataset-iscomplete="${item.isComplete}" data-testid="toDoItem">
            <td>${item.text}</td>
            <td>${item.isComplete}</td>
            <td><button>Delete</button></td>
        </tr>
        `)
    }
}



handleGet()