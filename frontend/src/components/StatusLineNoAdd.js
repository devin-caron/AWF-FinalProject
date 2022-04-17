import '../styles/statusLine.scss';
import Task from './Task';

export default function StatusLineNoAdd(props){
    const {status, tasks, addTask, deleteTask, addEmptyTask, moveTask} = props;

    let taskList, tasksForStatus;

    function handleAddEmpty() {
        addEmptyTask(status);
    }

    if(tasks){
        tasksForStatus = tasks.filter((task) => {
            return task.status === status;
        })
    }

    if(tasksForStatus){
        taskList = tasksForStatus.map( (task) => {
            return(
                <Task 
                    deleteTask={(id) => deleteTask(id)}
                    moveTask={(id, status) => moveTask(id, status)}
                    key={task.id}
                    task={task}
                />
            )
        })
    }
    return <div className='statusLine'>
        <h3>{status}</h3>
        {taskList}
    </div>;
}
