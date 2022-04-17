import React, {useState, useEffect} from 'react'
import "../styles/App.scss"
import StatusLine from '../components/StatusLine'
import StatusLineNoAdd from '../components/StatusLineNoAdd'
import axios from 'axios';

function Work() {
  const [tasks, setTasks] = useState([]);
  const authToken = localStorage.getItem("token");
  
  useEffect(() => {
    // loadTasksFromLocalStorage();
    loadTasksFromMongoDB()
    .then((response) => {

    })
    .catch((error) => {
      console.log('EROR: ', error);
    })
  }, []);

  function addEmptyTask(status) {
    const lastTask = tasks[tasks.length - 1];

    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = parseInt(lastTask.id) + 1;
    }

    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        category: "Work",
        title: "",
        description: "",
        urgency: "",
        status: status,
      },
    ]);
  }

  async function addTask(taskToAdd) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskToAdd.id;
    });

    let newTaskList = [...filteredTasks, taskToAdd];

    setTasks(newTaskList);

    console.log('Should see this when adding new task!');
    await saveTaskToMongoDB(newTaskList);

  }

  async function deleteTask(taskId) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(filteredTasks);

    await saveTaskToMongoDB(filteredTasks);
  }

  async function moveTask(id, newStatus) {
    let task = tasks.filter((task) => {
      return task.id === id;
    })[0];

    let filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    task.status = newStatus;

    let newTaskList = [...filteredTasks, task];

    setTasks(newTaskList);

    await saveTaskToMongoDB(newTaskList);
  }

  async function saveTaskToMongoDB(tasks){
    axios.post('http://localhost:5000/api/v1/tasks/update', tasks, 
    {
      headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
          'category': 'Work'
      }
    })
    .then( response => {
      console.log(response);
    })
    .catch( error => {
      console.log(error);
    });
  }


  async function loadTasksFromMongoDB(){
    const loadedTasks = await axios.get('http://localhost:5000/api/v1/tasks/work', {
      headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
      }
    });
    if(!loadedTasks){
      console.log('Error while loading the tasks!');
      return;
    }

    console.log('Loaded tasks: ', loadedTasks.data);
    setTasks(loadedTasks.data)
  }

  return (
    <div className="Work">
      <h1>Work</h1>
      <main>
        <section>
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="To Do"
          />
          <StatusLineNoAdd
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="In Progress"
          />
          <StatusLineNoAdd
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Completed"
          />
        </section>
      </main>
    </div>
  );
}


export default Work