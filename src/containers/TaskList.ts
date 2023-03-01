import Sortable from 'sortablejs';
import Task from "../components/Task";
import { generateId } from "../scripts";

export default class TaskList {

  public tasks: Task[];

  constructor(tasks: Task[]) {
    this.tasks = tasks;
  }

  public render() {
    const list = document.querySelector('.todo__list')! as HTMLUListElement;
    list.ondragover = (ev) => ev.preventDefault();
    list.innerHTML = '';
    this.tasks.forEach((task) => {
      const li = document.createElement('li') as HTMLLIElement;
      li.dataset.id = task.id;
      const check = document.createElement('input') as HTMLInputElement;
      check.type = 'checkbox';
      check.classList.add('checkbox-wrapper');
      check.id = task.id;
      check.checked = task.completed;
      check.onchange = () => this.completeTask(check.checked, task.id);
      li.appendChild(check);
      const item = task.render(() => this.delete(task))
      li.appendChild(item);
      list.appendChild(li);
    })
    Sortable.create(list, {
      delay: 3,
      onEnd: (ev) => {
        const itemEl = ev.item;
        const newIndex: any = ev.newIndex;
        const taskId = itemEl.dataset.id;

        const task: any = this.tasks.find(task => task.id == taskId);
        this.tasks.splice(this.tasks.indexOf(task), 1);
        this.tasks.splice(newIndex, 0, task);
      }
    });
  }

  public delete(task: Task) {
    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
    this.render();
    this.updateCantItemsLeft();
  }

  public create(text: string, completed: boolean = false) {
    const newTask = new Task(generateId(), text, completed);
    this.tasks.push(newTask);
  }

  public updateCantItemsLeft() {
    const cant = () => (this.tasks.filter(task => !task.completed).length);
    const items_left = document.querySelector('.items__left') as HTMLSpanElement;
    items_left.textContent = `${cant()} items left`;
  }

  public clearCompleted() {
    this.tasks = this.tasks.filter(task => !task.completed);
    this.render();
    this.updateCantItemsLeft();
  }

  public completeTask(completed: boolean, taskId: string) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId)
    if (taskIndex !== -1) {
      this.tasks[taskIndex].completed = completed;
      this.render();
      this.updateCantItemsLeft();
    }
  }

}