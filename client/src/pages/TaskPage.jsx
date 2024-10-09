import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";

const TasksPage = () => {
  const { getTasks, tasks } = useTasks();
  const navigate = useNavigate();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0)
    return (
      <div className="flex flex-col items-center h-[calc(100vh-125px)] justify-center ">
        <h1 className="text-4xl font-light text-zinc-600">No hay tareas</h1>
        <button
          className="mt-12 px-4 py-1 rounded-md my-2 bg-green-500 hover:bg-green-800 transition ease-in-out"
          onClick={() => navigate("/tasks/add-task")}
        >
          New Task
        </button>
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="grid sd:grid-cols-2 md:grid-cols-3 gap-3">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
      <button
        className="mt-20 bg-green-500 p-2 rounded-md text-xl font-semibold"
        onClick={() => navigate("/tasks/add-task")}
      >
        New Task
      </button>
    </div>
  );
};
//

export default TasksPage;
