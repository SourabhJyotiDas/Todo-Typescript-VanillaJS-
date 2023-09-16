import "./style.css";

interface Todo {
  title: string;
  description: string;
  readonly id: string;
  isCompleted: boolean;
}

const todos: Todo[] = [];

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
  todos.push(todo);

  randerTodos(todos);

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
  let deleteBtn = document.getElementsByClassName(
    "deleteBtn"
  ) as HTMLCollectionOf<HTMLButtonElement>;

  for (const button of deleteBtn) {
    button.onclick = (e) => {
      let id = (e.target as HTMLInputElement).id;
      let newTodos = todos.filter((element) => {
        return element.id !== id;
      });
      randerTodos(newTodos);
    };
  }
  // ------------------------------------------------------------------
  let completeBtn = document.getElementsByClassName(
    "completeBtn"
  ) as HTMLCollectionOf<HTMLButtonElement>;

  for (const button of completeBtn) {
    button.onclick = (e) => {
      let id = (e.target as HTMLInputElement).id;
      let newTodos = todos.map((element) => {
        if (element.id === id) {
          let todo: Todo = {
            id: element.id,
            title: element.title,
            description: element.description,
            isCompleted: !element.isCompleted,
          };
          return todo;
        } else {
          return element;
        }
      });
      randerTodos(newTodos);
    };
  }

  // ------------------------------------------------------------------
};
