import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/task";

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {}
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      await getTasks();
    } catch (error) {}
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {}
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {}
  };

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
      await getTasks();
    } catch (error) {}
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
