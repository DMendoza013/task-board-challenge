// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
//capturing user input
const taskFormEl = $('#taskForm');
const saveButton = $('#saveButton');
const userTaskTitleEl = $('#taskTitle');
const userTaskDateEL = $('#taskDate');
const userDescEl = $('#taskDesc');

// Todo: create a function to generate a unique task id
function generateTaskId() {

  return taskList.length;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>');
    taskCard.addClass('card project-card draggable my-3');
    taskCard.attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.date);
    const cardDueDate = $('<p>').addClass('card-text').text(task.desc);
    const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);

    return taskCard;

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
  event.preventDefault();
  const userTask = userTaskTitleEl.val().trim();
  const userDate = userTaskDateEL.val();
  const userDesc = userDescEl.val().trim();

  const taskId = {
    title: userTask,
    date: userDate,
    desc: userDesc,
    status: 'to-do',
    id: generateTaskId()
  };
  
  if (!taskList) {
    taskList = [];
  }

  taskList.push(taskId);

  localStorage.setItem('taskList',JSON.stringify(taskList));

  renderTaskList();

  userTaskTitleEl.val('');
  userTaskDateEL.val('');
  userDescEl.val('');

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    index = $(this).attr('data-task-id')
    taskList = taskList.filter(function(t) {
      if(t.id == index ) {
        return false;
      } else {
        return true;
      }    
    });

    localStorage.setItem('taskList', JSON.stringify(taskList));

    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

  renderTaskList();
  
  taskFormEl.on('submit', handleAddTask);

  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });

  $('#taskDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });


});

