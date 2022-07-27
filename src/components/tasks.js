import React, { useState } from 'react';
import { Checkbox , Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { OmitProps } from 'antd/lib/transfer/ListBody';

const Task = React.memo(function Task(props) {
	const [isEditing, setIsEditing] = useState(false);

  function handleInputChange(e) {
    let newTask = {...props.data};
    newTask.text = e.target.value;
    props.setTask(newTask);
  }

  function handleKeyDown(e) {
    if (e.code === "Enter") {
      handleExit(e);
    }
  }
  function handleBlur(e) {
    handleExit(e);
  }

  function handleExit(e) {
    setIsEditing(false);
    let newTask = {...props.data};
    newTask.text = e.target.value;
    props.setTask(newTask);
  }

  function handleToggle() {
    let newTask = {...props.data};
    newTask.done = !newTask.done;
    props.setTask(newTask);
  }

  return (
    <div className='task-line'>
      <label className='task-item'>
        <input type="checkbox" checked={props.data.done} onChange={handleToggle} disabled={isEditing}/>
        {
          isEditing ? 
          <input className='ant-input' onChange={handleInputChange} onKeyDown={handleKeyDown} onBlur={handleBlur} value={props.data.text}></input> : 
          <span className="text-area" style = {{textDecoration: (props.data.done) ? "line-through" : "none"}} id={props.data.id}>{props.data.text}</span> 
        }
        
      </label>
      <Button onClick={() => {setIsEditing(true)}} className='btn-elem' type="secondary" shape="circle" icon={<EditOutlined />} disabled={props.data.done} size='medium' />
      <Button onClick={() => props.deleteTask(props.data.id)} className='btn-elem' type="primary" shape="circle" icon={<DeleteOutlined />} size='medium' />
    </div>
  )
  
  
});

export default Task;