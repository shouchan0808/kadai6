import "./styles.css";
import { useState } from "react";
let num = 0;
export default function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const onChangeText = (e) => setText(e.target.value);

  const onClickButton = (evt) => {
    evt.preventDefault();
    const task = text;
    AddTaskSet(task);
  };

  const AddTaskSet = (task) => {
    // 入力値が空の場合リターンを返す
    if (!task) {
      return;
    }
    const newArr = [...tasks];
    const taskKeyword = {
      id: num,
      name: task
    };
    newArr.push(taskKeyword);
    setTasks(newArr);
    num++;
    // localStrageにデータを保存する
    localStorage.setItem("currentTasks", JSON.stringify(newArr));
  };
  //deleteボタンをクリックし、イベントを発動（タスクが削除）
  const onClickDelete = (evt) => {
    evt.preventDefault();
    const deleteData = evt.target.closest("li");
    const dataId = evt.target.parentNode.getAttribute("id");
    const deleteDataParent = deleteData.parentElement;
    const newArr = [...tasks];
    newArr.splice(dataId, 1);
    setTasks(newArr);

    deleteDataParent.removeChild(deleteData);
    // localStrageにデータを保存する
    localStorage.setItem("currentTasks", JSON.stringify(newArr));
  };

  const onClickcomplete = (evt) => {
    evt.preventDefault();
  };
  return (
    <div className="wrap app">
      <div id="app">
        <h1>TODO-List</h1>
      </div>
      <form>
        <input
          className="task_value"
          type="text"
          value={text}
          onChange={onChangeText}
        />
        <button className="task_submit" type="button" onClick={onClickButton}>
          Add Task
        </button>
      </form>
      <div className="contents">
        <div id="table">
          <h2>Current Tasks</h2>
          <ul className="task_list">
            {tasks.map((tasks) => (
              <li id={tasks.id} key={tasks.name}>
                {tasks.name}
                <button
                  className="task_submit"
                  type="button"
                  onClick={onClickcomplete}
                >
                  complete
                </button>
                <button
                  className="task_submit"
                  type="button"
                  onClick={onClickDelete}
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div id="table" className="position_table">
          <h2>Compleated</h2>
          <ul className="compleate_list"></ul>
          <button id="comp" className="comp" type="button">
            All Deleate
          </button>
        </div>
      </div>
    </div>
  );
}
