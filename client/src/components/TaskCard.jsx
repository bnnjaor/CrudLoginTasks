import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();

  return (
    <div className="flex flex-col gap-2 bg-zinc-700 p-2 rounded-md">
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p className="font-light text-lg text-zinc-400">{task.description}</p>
      <div className="flex gap-x-5">
        <button
          onClick={() => {
            deleteTask(task._id);
          }}
          className="text-xs bg-red-500 p-1 rounded-sm"
        >
          Borrar
        </button>
        <Link
          to={`/tasks/${task._id}`}
          className="text-xs bg-blue-500 p-1 rounded-sm"
        >
          Actualizar
        </Link>
      </div>
      <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  );
};

export default TaskCard;
