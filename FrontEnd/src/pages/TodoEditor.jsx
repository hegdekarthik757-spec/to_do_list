import React, { useState, useEffect } from "react";
import "../css/TodoEditor.css";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { message } from "antd";
import { getErrorMessage } from "../../util/getError";
import { getUserDetails } from "../../util/getUser";
import todoServices from "../../services/todoServices";
import { useNavigate } from "react-router-dom";
import BinIcon from "../assets/images/bin.png";
import EditIcon from "../assets/images/edit.png";

const TodoEditor = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [allTask, setAllTask] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);


  const navigate = useNavigate();
  const user = getUserDetails();

  /*The response retrieves tasks from ToDoService for the specified user ID. If no tasks exist, return an empty array ([]) */
  const getAllTask = async () => {
    try {
      const response = await todoServices.getAllTask(user?.userId);
      console.log("Fetched tasks:", response.data);
      setAllTask(response.data.tasks || []); 
    } catch (err) {
      console.error(err);
      message.error(getErrorMessage(err));
    }
  };

  /*useEffect runs on page render or when dependencies change. It verifies the user and user ID; if valid, fetches all tasks. Otherwise, redirects to the login page.*/
  useEffect(() => {
    if (user && user?.userId) {
      getAllTask();
    } else {
      navigate("/login");
    }
  }, [navigate]);

/* handleSubmit() is triggered when the user submits the task form. 
  It checks if an existing task is being edited via editTaskId(handleEditTask()) or a new one is being added. 
  The function sends the task data to the backend, updates the task list,
  clears the input fields, and shows success or error messages accordingly. */
  
  async function handleSubmit() {
  setLoading(true);
  try {
    const userId = getUserDetails()?.userId;
    const data = {
      title,
      description,
      isCompleted: false,
      createdBy: userId,
    };

    let response; 

    if (editTaskId) {
      //  Editing existing task
      response = await todoServices.editTask(editTaskId, data);
      message.success("Task updated successfully");
      setEditTaskId(null);
    } else {
      // if not existed create new task
      response = await todoServices.createTask(data);
      message.success("Task successfully added");
    }

    // Refresh list
    await getAllTask();

    // Clear input fields
    setTitle("");
    setDescription("");
  } catch (err) {
    console.log(err);
    message.error(getErrorMessage(err));
  } finally {
    setLoading(false);
  }
}

/*handleDeleteTask() is called when the user clicks the delete button for a task.It sends a delete request to the backend using the task’s unique ID (_id).On success, it shows a confirmation message and refreshes the task list to remove the deleted item from the UI. If something goes wrong, it catches the error and displays an error message instead.*/ 


async function handleDeleteTask(item) {
  console.log(item._id)
  try {
    const response = await todoServices.deleteTask(item._id);
    console.log("✅ Deleted:", response.data);
    message.success(`${item.title} deleted successfully`);
     getAllTask();

  } catch (err) {
    console.error("Delete error:", err);  
    message.error(getErrorMessage(err));
  }
}
/* handleEditTask() runs when the user clicks the Edit button for a specific task.
  It fills the form inputs with the task’s existing title and description, 
  and saves that task’s unique ID in editTaskId so the app knows which task 
  to update when the user clicks “Add Task” (which now acts as “Save Changes”).
  A small info message is shown to confirm that the user is in edit mode. */
function handleEditTask(item) {
  try {
    setTitle(item.title);
    setDescription(item.description);
    setEditTaskId(item._id);

    message.info(`Editing task: ${item.title}`);
  } catch (err) {
    console.error(err);
    message.error(getErrorMessage(err));
  }
}

/* 
  completedTask() runs when the user clicks the checkbox beside a task.
  It first toggles the task’s completion status locally (for instant UI feedback),
  then sends the updated status to the backend using the task’s ID.
  Once the update succeeds, it shows a success message saying whether
  the task is now marked as "Completed" or "Incomplete".
  If an error occurs, it logs it and displays an error message instead.
*/

async function completedTask(index, item) {
  try {
    const updatedTasks = [...allTask];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setAllTask(updatedTasks);

    // Send update to backend
    await todoServices.toggleComplete(item._id, {
      isCompleted: updatedTasks[index].isCompleted,
    });

    message.success(
      `Marked as ${updatedTasks[index].isCompleted ? "Completed" : "Incomplete"}`
    );
  } catch (err) {
    console.error(err);
    message.error(getErrorMessage(err));
  }
}


  return (
    <div>
      <header>
        <Header />
        <Navbar />
      </header>

      <div className="app-wrapper">
        <div className="todo-container">
          <h1 className="title">My Tasks</h1>

          {/* Task Add Form */}
          <form className="task-form">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              className="taskInput"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="taskInput"
            />
            <button onClick={handleSubmit} type="button" className="addTaskBtn">
            <span>{loading ? "Adding..." : "Add Task"}</span>
            </button>

          </form>

          {/* ✅ Display Tasks (View Only Mode) */}
          <div className="task-list-box">
            {allTask.length > 0 ? (
              allTask.map((item, index) => (
                <div className="TitleAndDescription" key={index}>
                  <input
                      type="checkbox"
                      className="checkBox"
                      checked={item.isCompleted}
                      onChange={() => completedTask(index, item)}
                  />


                  <div
                    className={`textBox ${
                      item.isCompleted ? "checked" : ""
                    }`}
                  >
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="toDoEditButtons">
                <button
                  onClick={() => handleDeleteTask(item)}
                  className="deleteTaskDesc">
                      <img src={BinIcon} alt="delete" />
                </button>
                <button
                    onClick={() => handleEditTask(item)}
                    className="editTaskDesc">
                        <img src={EditIcon} alt="edit" />
                </button>
              </div>
                </div>
              ))
            ) : (
              <p>No tasks yet. Add one above 👆</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TodoEditor;
