let oldTodos = {};

function format(a) {
  const Map = {};
  for (let i = 0; i < a.length; i++) {
    Map[a[i].id] = a[i];
  }
  return Map;
}

function isEqual(objA, objB) {
  if (objA.id !== objB.id) {
    return false;
  }
  if (objA.title !== objB.title) {
    return false;
  }
  if (objA.description !== objB.description) {
    return false;
  }
  return true;
}

function compareData(oldTodos, newTodos) {
  let notIncluded = [];
  let changed = [];
  let oldTodosKeys = Object.keys(oldTodos);
  let newTodosKeys = Object.keys(newTodos);
  for (let i of oldTodosKeys) {
    if (!newTodosKeys.includes(i) || !isEqual(oldTodos[i], newTodos[i])) {
      notIncluded.push(oldTodos[i]);
    }
  }
  for (let j of newTodosKeys) {
    if (!oldTodosKeys.includes(j) || !isEqual(newTodos[j], oldTodos[j])) {
      changed.push(newTodos[j]);
    }
  }
  return [notIncluded, changed];
}

function Reconcile(Data) {
  let data1 = Data[0];
  let data2 = Data[1];
  let parentElement = document.getElementById('mainArea');
  if (data1.length > 0) {
    for (let i = 0; i < data1.length; i++) {
      let elementToRemove = document.getElementById(data1[i].id);
      if (elementToRemove) {
        parentElement.removeChild(elementToRemove);
      }
    }
  }
  for (let i = 0; i < data2.length; i++) {
    let childElement = document.createElement('div');
    childElement.setAttribute('class', 'todo');
    childElement.setAttribute('id', data2[i].id);
    let title = document.createElement('div');
    title.setAttribute('class', 'todo-title');
    title.innerHTML = data2[i].title;
    let description = document.createElement('div');
    description.setAttribute('class', 'todo-description');
    description.innerHTML = data2[i].description;
    childElement.appendChild(title);
    childElement.appendChild(description);
    parentElement.appendChild(childElement);
  }
}

window.setInterval(() => {
  let todos = [];
  for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
    todos.push({
      title: 'Go to gym',
      description: `Go to gym from ${i}`,
      id: i + 1
    });
  }
  let b = format(todos);
  Reconcile(compareData(oldTodos, b));
  oldTodos = b;
}, 1000);

