interface Todo {
  readonly id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

const todos: Todo[] = localStorage.getItem("Todos")
  ? JSON.parse(String(localStorage.getItem("Todos")))
  : [];

const myForm = document.getElementById("myForm") as HTMLFormElement;
const titleInput = document.getElementById("titleInput") as HTMLInputElement;
const descriptionInput = document.getElementById(
  "descriptionInput"
) as HTMLInputElement;

myForm.onsubmit = (e) => {
  e.preventDefault();
  const todo: Todo = {
    title: titleInput.value,
    description: descriptionInput.value,
    id: String(Math.random() * 1000),
    isCompleted: false,
  };

  todos.unshift(todo);
  randerTodos(todos);
  localStorage.setItem("Todos", JSON.stringify(todos));
  titleInput.value = "";
  descriptionInput.value = "";
};

const todosContainer = document.getElementById(
  "todosContainer"
) as HTMLDivElement;

// ------------------------------------------------------------------
const randerTodos = (todos: Todo[]) => {
  let myDiv = "";
  todos.forEach((element) => {
    myDiv += `<div> 
        <div class="card my-2">
        <div class="card-header">
      #${element.id}
        </div>
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.description}</p>
          <button id=${
            element.id
          } class="deleteBtn btn btn-danger">Delete</button>
          <button 
          id="${element.id}" class=" completeBtn btn btn-${
      element.isCompleted ? "secondary" : "success"
    }">${element.isCompleted ? "Completed" : "Complete"}</button>
        </div>
      </div>
        </div>`;
  });
  todosContainer.innerHTML = myDiv;
  // ------------------------------------------------------------------
  let completeBtn = document.getElementsByClassName(
    "completeBtn"
  ) as HTMLCollectionOf<HTMLButtonElement>;

  for (const button of completeBtn) {
    button.onclick = (e) => {
      console.log("Click");

      let id = (e.target as HTMLInputElement).id;
      console.log(id);

      let newTodos = todos.map((element) => {
        if (element.id === id) {
          let todo: Todo = {
            id: element.id,
            title: element.title,
            description: element.description,
            isCompleted: element.isCompleted ? false : true,
          };
          return todo;
        } else {
          return element;
        }
      });
      console.log(newTodos);

      localStorage.setItem("Todos", JSON.stringify(newTodos));
      randerTodos(newTodos);
      location.reload();
    };
  }
  // ------------------------------------------------------------------
  let deleteBtn = document.getElementsByClassName(
    "deleteBtn"
  ) as HTMLCollectionOf<HTMLButtonElement>;

  for (const button of deleteBtn) {
    button.onclick = (e) => {
      let id = (e.target as HTMLInputElement).id;
      let newTodos = todos.filter((element) => {
        return element.id !== id;
      });
      localStorage.setItem("Todos", JSON.stringify(newTodos));
      randerTodos(newTodos);
      location.reload();
    };
  }
  // ------------------------------------------------------------------
};

randerTodos(todos);
