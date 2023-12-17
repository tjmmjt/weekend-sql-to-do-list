console.log("JS is sourced!");

function onReady() {
  handleGet();
}

// ! Create Handlers
// get handler
function handleGet() {
  axios
    .get("/todos")
    .then((response) => {
      console.log("GET todos:", response.data);
      render(response.data);
    })
    .catch((error) => {
      console.log("Axios GET error:", error);
    });
}

function handlePost(todoItem) {
  // onclick, post new todo item, then get new list and render
  axios
    .post("/todos", todoItem)
    .then((response) => {
      console.log("POST todo");
      handleGet();
    })
    .catch((error) => {
      console.log("Axios POST error:", error);
    });
}

function handleDelete(event) {
  event.preventDefault();
  // onclick, delete todo tr
  // identify ID to delete by dataset.id
  console.log("TR dataset.id", event.target.closest("tr").dataset.id);
  // declare todoId = dataset.id
  let todoId = event.target.closest("tr").dataset.id;
  axios
    .delete(`/todos/${todoId}`)
    .then(() => {
      // refresh data
      handleGet();
    })
    .catch((error) => {
      console.log("Axios Delete Error:", error);
    });
}

function handlePut(event) {
  event.preventDefault();
  // TODO toggle isComplete true/false
  // declare todoId = dataset.id
  let todoId = event.target.closest("tr").dataset.id;

  // get string value of dataset.iscomplete
  console.log(
    "TR dataset.iscomplete",
    event.target.closest("tr").dataset.iscomplete
  );
  // declare isComplete and initialize boolean with if comparison statement
  let readValueForServer =
    event.target.closest("tr").dataset.iscomplete === "true";
  console.log("isComplete:", readValueForServer);

  //axios put, pass id into url, and data containing object with isComplete key/boolean value
  axios
    .put(`/todos/${todoId}`, { isComplete: readValueForServer })
    // then refresh
    .then(() => {
      handleGet();
    })
    .catch((error) => {
      console.log("Axios Put Error:", error);
    });
}

// ! Submit
function submitToDo(event) {
  event.preventDefault();
  // declare input variable and initialize w/ input.value
  const todoInput = document.getElementById("todoInput").value;
  console.log("submitToDo:", todoInput);
  // declare newToDo and initialize with object
  const newToDo = { text: todoInput, isComplete: false };
  // post newToDo
  handlePost(newToDo);
  document.getElementById("todoInput").value = "";
}

// ! Render
// render todo items to DOM
function render(todoItems) {
  // declare todoList, initialize with DOM id
  let todoList = document.getElementById("todoList");
  // prevent stacking duplicates by setting innerhtml to empty string
  todoList.innerHTML = "";
  // loop through todoItems param and append each item to DOM
  for (let item of todoItems) {
    // wasn't appending, looked at other assignments and added parentheses?
    todoList.innerHTML += `
        <tr data-id=${item.id} data-iscomplete=${item.isComplete} data-testid="toDoItem">
            <td>${item.text}</td>
            <td><button onclick="handlePut(event)">${item.isComplete}</button></td>
            <td><button onclick="handleDelete(event)">Delete</button></td>
        </tr>
        `;
  }
}

onReady();
