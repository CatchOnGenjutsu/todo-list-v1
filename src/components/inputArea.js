import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'antd/dist/antd.css';

const InputArea = ({data, addNewTodo, ...props}) => {
  const [newTodoText, setNewTodoText] = useState("");

  const onFinish = (e) => {
    if(newTodoText !== "") {
      const newToDo = {id : uuidv4(), text: newTodoText, done: false};
      addNewTodo(newToDo);
    }
    setNewTodoText('')
  };
  const onKeyDown = (e) => {
    if(e.keyCode === 13) {
      onFinish();
    }
  }

  return (
    <div className='input-area'>
      <input className='ant-input' id='inputId' onKeyDown={onKeyDown} placeholder="Write here what you want to do" value={newTodoText} onChange={e => {
        setNewTodoText(e.target.value);
      }}></input>
      <button className='ant-btn-primary ant-btn' onClick={onFinish}>Add ToDo</button>
    </div>
  );
};

export default InputArea;