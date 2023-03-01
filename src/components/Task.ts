import ITask from "../interfaces/ITask";


export default class Task implements ITask {

  public id: string;
  public text: string;
  public completed: boolean;

  constructor(id: string, text: string, completed: boolean) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  };

  public render(onDelete: () => void) {
    const fragment = document.createDocumentFragment() as DocumentFragment;

    const label = document.createElement('label') as HTMLLabelElement;
    label.htmlFor = this.id;
    fragment.appendChild(label);
    const text = document.createElement('p') as HTMLParagraphElement;
    text.textContent = this.text;
    if (this.completed) {
      text.style.textDecoration = 'line-through';
      text.style.color = 'hsl(237, 14%, 26%)';
    }
    fragment.appendChild(text);
    const btnDelete = document.createElement('button') as HTMLButtonElement;
    btnDelete.addEventListener('click', () => {
      onDelete();
    })
    fragment.appendChild(btnDelete);

    return fragment;
  }
};