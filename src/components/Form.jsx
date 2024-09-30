import React from 'react';
import { todoList } from '../data';

const Form = () => {
    const [tasks, setTasks] = React.useState(todoList); 
    const [newTask, setNewTask] = React.useState(''); 
    const [taskDone, setTaskDone] = React.useState(false); 
    const [editingTaskId, setEditingTaskId] = React.useState(null); 
    const [editingTaskName, setEditingTaskName] = React.useState(''); 
    const [editingTaskDone, setEditingTaskDone] = React.useState(false); 

    const removeTask = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id); 
        setTasks(newTasks);
    };

    const startEditing = (task) => {
        setEditingTaskId(task.id); 
        setEditingTaskName(task.taskName); 
        setEditingTaskDone(task.isDone); 
    };

    const addNewTask = (e) => {
        e.preventDefault();
        if (editingTaskId) {
            saveTask(); 
        } else if (newTask.trim()) {
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

    const saveTask = () => {
        const updatedTasks = tasks.map(task =>
            task.id === editingTaskId
                ? { ...task, taskName: editingTaskName, isDone: editingTaskDone } 
                : task
        );
        setTasks(updatedTasks);
        setEditingTaskId(null);
        setEditingTaskName('');
        setEditingTaskDone(false);
    };

    const toggleTaskDone = (id) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, isDone: !task.isDone } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <>
            <form onSubmit={addNewTask}>
                <div className='form'>
                    <input
                        type="text"
                        className="taskName"
                        placeholder="Input task name..."
                        value={editingTaskId ? editingTaskName : newTask} 
                        onChange={(e) => editingTaskId ? setEditingTaskName(e.target.value) : setNewTask(e.target.value)} 
                    />
                    <label>
                        Is task done?
                        <input
                            type="checkbox"
                            className="taskDone"
                            checked={editingTaskId ? editingTaskDone : taskDone} 
                            onChange={() => editingTaskId ? setEditingTaskDone(!editingTaskDone) : setTaskDone(!taskDone)} 
                        />
                    </label>
                    <button type="submit" className='addNewTask'>
                        {editingTaskId ? 'Save Task' : 'Add new task'}
                    </button>
                </div>
            </form>

            {tasks.map((task) => {
                const { id, taskName, isDone } = task;
                return (
                    <div key={id} className='task'>
                        <h3>{taskName}</h3>
                        <div className='buttons'>
                            <button
                                className='todoButton'
                                onClick={() => toggleTaskDone(id)}
                                style={{ color: isDone ? 'green' : 'black' }} 
                            >
                                {isDone && <i className="fa-solid fa-square-check check todoIcon"></i>}
                            </button>


                            <button className='todoButton editButton' onClick={() => startEditing(task)}>
                                <i className="fa-solid fa-pen-to-square edit todoIcon"></i>
                            </button>
                            <button className='todoButton deleteButton' onClick={() => removeTask(id)}>
                                <i className="fa-duotone fa-solid fa-square-xmark cross todoIcon"></i>
                            </button>
                        </div>
                    </div>
                );
            })}

            {tasks.length > 1 && (
                <button type='button' className='btn' onClick={clearAllTasks}>
                    Remove all tasks
                </button>
            )}
        </>
    );
};

export default Form;
