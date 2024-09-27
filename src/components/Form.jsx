import React from 'react'
import { todoList } from '../data'

const Form = () => {

  return (
    <>
    <form >
        <input type="text" name="taskName" placeholder="Input task name..."/>
        <input type="checkbox"/>
        <button type="submit">Add new task</button>
    </form>

    {todoList.map((task) => {
        const {id, taskName, isDone} = task
        return (
            <div key={id} className='task'>
                <h3>{taskName}</h3>
                <div className='buttons'>
                    <button className='todoButton deleteButton'><i className="fa-solid fa-square-check check todoIcon"></i></button>
                    <button className='todoButton editButton'><i className="fa-solid fa-pen-to-square edit todoIcon"></i></button>
                    <button className='todoButton deleteButton'><i className="fa-duotone fa-solid fa-square-xmark cross todoIcon"></i></button>
                </div>
            </div>
        )
    })}
    </>
  )
}

export default Form;