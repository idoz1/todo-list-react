import React from 'react';
import { todoList } from '../data';

const Form = () => {
    const [tasks, setTasks] = React.useState(todoList); 
    const [newTask, setNewTask] = React.useState(''); 
    const [taskDone, setTaskDone] = React.useState(false); 

    const removeTask = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id); 
        setTasks(newTasks);
    };

    const addNewTask = (e) => {
        e.preventDefault();
        if (newTask.trim()) {
            const newTaskObj = {
                id: tasks.length + 1, 
                taskName: newTask,
                isDone: taskDone
            };
            setTasks([...tasks, newTaskObj]);
            setNewTask(''); 
            setTaskDone(false); 
        }
    };

    const clearAllTasks = () => {
        setTasks([]);
    };

    return (
        <>
            <form onSubmit={addNewTask}>
                <div className='form'>
                    <input
                        type="text"
                        className="taskName"
                        placeholder="Input task name..."
                        value={newTask} 
                        onChange={(e) => setNewTask(e.target.value)} 
                    />
                    <label>
                        Is task done?
                        <input
                            type="checkbox"
                            className='taskDone'
                            checked={taskDone} 
                            onChange={() => setTaskDone(!taskDone)} 
                        />
                    </label>
                    <button type="submit" className='addNewTask'>Add new task</button>
                </div>
            </form>

            {tasks.map((task) => {
                const { id, taskName, isDone } = task;
                return (
                    <div key={id} className='task'>
                        <h3>{taskName}</h3>
                        <div className='buttons'>
                            <button className='todoButton deleteButton'>
                                <i className="fa-solid fa-square-check check todoIcon"></i>
                            </button>
                            <button className='todoButton editButton'>
                                <i className="fa-solid fa-pen-to-square edit todoIcon"></i>
                            </button>
                            <button className='todoButton deleteButton' onClick={() => removeTask(id)}>
                                <i className="fa-duotone fa-solid fa-square-xmark cross todoIcon"></i>
                            </button>
                        </div>
                    </div>
                );
            })}

            {todoList.length > 1 ? (<button type='button' className='btn' onClick={clearAllTasks}>Remove all tasks</button>) : null}
        </>
    );
};

export default Form;
