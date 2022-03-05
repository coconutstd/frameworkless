let template;

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById("todo-item");
  }

  return template.content.firstElementChild.cloneNode(true);
};

const getTodoElement = (todo, index, events) => {
  const { text, completed } = todo;

  const element = createNewTodoNode();

  element.querySelector("input.edit").value = text;
  element.querySelector("label").textContent = text;

  if (completed) {
    element.classList.add("completed");

    element.querySelector("input.toggle").checked = true;
  }

  const handler = (e) => events.deleteItem(index);

  element.querySelector("button.destroy").addEventListener("click", handler);

  return element;
};

export default (targetElement, { todos }, events) => {
  const newTodolist = targetElement.cloneNode(true);
  newTodolist.innerHTML = "";

  todos
    .map((todo, index) => getTodoElement(todo, index, events))
    .forEach((element) => {
      newTodolist.appendChild(element);
    });

  return newTodolist;
};
