// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("taskList"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
//capturing user input
const taskFormEl = $('#taskForm');
const saveButton = $('#saveButton');
const userTaskTitleEl = $('#taskTitle');
const userTaskDateEL = $('#taskDate');
const userDescEl = $('#taskDesc');

// Todo: create a function to generate a unique task id
function generateTaskId() {

  const userTask = userTaskTitleEl.val().trim();
  const userDate = userTaskDateEL.val();
  const userDesc = userDescEl.val().trim();

  const taskId = {
    title: userTask,
    date: userDate,
    desc: userDesc,
    status: 'to-do'
  };
  
  let getTasks = taskList;
  if (!getTasks) {
    getTasks = [];
  }

  getTasks.push(taskId);

  localStorage.setItem('taskList',JSON.stringify(getTasks));

  renderTaskList();

  // userTaskDateEL.val('');
  // userTaskDateEL.val('');
  // userDescEl.val('');
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    console.log(task.id);
  const taskCard = $('<div>')
    .addclass('card project-card draggable my-3')
    .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.date);
    const cardDueDate = $('<p>').addClass('card-text').text(task.desc);
    const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-project-id', project.id);
  cardDeleteBtn.on('click', handleDeleteProject);
    
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const storageTask = taskList;

  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();


  for(task of storageTask) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

  // renderTaskList();
  
  taskFormEl.on('submit', generateTaskId);

  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });

  $('#taskDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });

  // return taskList;
});

