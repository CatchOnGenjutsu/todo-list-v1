import {useState, useCallback, useMemo} from "react";
import { v4 as uuidv4 } from 'uuid';
import InputArea from "./components/inputArea";
import Task from "./components/tasks";

function App () {
  const initialTasks = useMemo(() => getTasksList, []);
  const [tasks, setTasks] = useCustomState(initialTasks);
  
  function getTasksList() {
    const tasksList = sessionStorage.getItem("currentTasksList");
    if (tasksList === null) {
      return sessionStorage.setItem("currentTasksList", JSON.stringify([]));
    }
    return JSON.parse(tasksList);
  }

  function useCustomState(init){
    const [value, setValue] = useState(init);

    function setCustomValue(func) {
      setValue(prev => {
        const newValue = func(prev);
        sessionStorage.setItem("currentTasksList", JSON.stringify(newValue));
        return newValue;
      })
    }

    return [value, setCustomValue];
  }

  function addNewTodo(todo) {
    setTasks(tasks => [todo, ...tasks]);
  }

  function deleteTask(id) {
    setTasks(tasks=>tasks.filter(task=>task.id!=id))
  }

  function setTask(newTask) {
    setTasks(tasks=>tasks.map(task=> {
      if (task.id == newTask.id)
        task = newTask
      return task;
    }))
  }

  return(
    <div className="full-field">
      <h1 className="todo-title">ToDo List</h1>
      <h2>Active tasks: <span className="count">{tasks.filter(task => task.done === false).length}</span></h2>
      <InputArea addNewTodo={addNewTodo} />
      <div className="tasks-list">
        {tasks.map((task) => (
          <Task setTask={setTask} deleteTask={deleteTask}
            data={task} key={task.id}></Task>
        ))}
      </div>
    </div>
  )
}

export default App;