import Task from './components/Task';
import TaskList from './containers/TaskList';
import ITask from './interfaces/ITask';
import './sass/main.scss';
import { generateId } from './scripts';



let tasks: ITask[] = [
  { id: generateId(), text: 'Learn React', completed: true },
  { id: generateId(), text: 'Learn Laravel', completed: false },
  { id: generateId(), text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', completed: false },
  { id: generateId(), text: 'Tu puedes amigo, ¡VAMOS!', completed: false },
]

const taskObjects = tasks.map(task => new Task(task.id, task.text, task.completed));
const taskList = new TaskList(taskObjects)
taskList.render();
taskList.updateCantItemsLeft();


//Head to change theme
const changeTheme = document.getElementById('change__theme')! as HTMLImageElement;

// Verifying theme
verifyTheme();
changeTheme.addEventListener('click', () => {
  const theme = localStorage.getItem('theme');
  if (theme == 'light') {
    localStorage.setItem('theme', 'dark');
    verifyTheme();
  } else {
    localStorage.setItem('theme', 'light');
    verifyTheme();
  }
})


//Box input
const check = document.getElementById('initial__check')! as HTMLInputElement;
const input = document.querySelector('.input')! as HTMLInputElement;
input.addEventListener('keydown', (ev: KeyboardEvent) => {
  let completed = undefined;
  if (ev.key == 'Enter') {
    check.checked ? completed = true : completed = false;
    taskList.create(input.value, completed);
    taskList.render();
    taskList.updateCantItemsLeft();
    input.value = '';
    check.checked = false;
  }
})

//Button clear
const btnClear = document.querySelector('.btn__clear')! as HTMLButtonElement;
btnClear.addEventListener('click', () => {
  taskList.clearCompleted();
})

//___Button Options Render___
const btnAll = document.querySelector('.btn__all')! as HTMLButtonElement;
const btnActive = document.querySelector('.btn__active')! as HTMLButtonElement;
const btnCompleted = document.querySelector('.btn__completed')! as HTMLButtonElement;
btnAll.addEventListener('click', () => {
  taskList.render();
  taskList.updateCantItemsLeft();
  btnAll.style.color = 'hsl(220, 98%, 61%)';
  btnActive.style.color = 'hsl(236, 9%, 61%)';
  btnCompleted.style.color = 'hsl(236, 9%, 61%)';
});
btnAll.style.color = 'hsl(220, 98%, 61%)';


btnActive.addEventListener('click', () => {
  const list = taskList.tasks
    .filter((task) => !task.completed)
    .map((task) => new Task(task.id, task.text, task.completed));

  const activeList = new TaskList(list);
  btnActive.style.color = 'hsl(220, 98%, 61%)';
  btnAll.style.color = 'hsl(236, 9%, 61%)';
  btnCompleted.style.color = 'hsl(236, 9%, 61%)';
  activeList.render();
});

btnCompleted.addEventListener('click', () => {
  const list = taskList.tasks
    .filter((task) => task.completed)
    .map((task) => new Task(task.id, task.text, task.completed));

  const activeList = new TaskList(list);
  btnCompleted.style.color = 'hsl(220, 98%, 61%)';
  btnAll.style.color = 'hsl(236, 9%, 61%)';
  btnActive.style.color = 'hsl(236, 9%, 61%)';
  activeList.render();
});


// Functions

function verifyTheme() {
  const theme = localStorage.getItem('theme');
  if (theme == 'dark') {
    changeTheme.src = '/assets/images/icon-sun.svg'
    document.body.classList.add('dark-mode');
  } else if (theme == 'light') {
    changeTheme.src = '/assets/images/icon-moon.svg'
    document.body.classList.remove('dark-mode');
  } else {
    localStorage.setItem('theme', 'light');
  }
}