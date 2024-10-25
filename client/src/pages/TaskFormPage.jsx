import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const TaskFormPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createTask, getTask, updateTask,  } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  if (params.id === "add-task") params.id = null;

  setValue("date", Date.now());

  useEffect(() => {
    if (params.id) {
      const loadTask = async () => {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs.utc(task.date).format("YYYY-DD-MM"));
      };
      loadTask();
    }
  }, [params.id, getTask, setValue]);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, {
        ...data,
        date: dayjs.utc(data.date).format(),
      });
    } else {
      createTask({
        ...data,
        date: dayjs.utc(data.date).format(),
      });
    }
    navigate('/tasks');
  });

  return (
    <div className="flex items-center h-[calc(100vh-125px)] shadow-md justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md flex flex-col items-center">
        <h1 className="text-4xl font-light text-zinc-500 ">
          {params.id ? "Editar Tarea" : "Nueva Tarea"}
        </h1>
        <form className="flex flex-col w-full space-y-5" onSubmit={onSubmit}>
          <label className="font-bold text-xl" htmlFor="title">
            Titulo
          </label>
          <input
            type="text"
            placeholder="Titulo"
            {...register("title", { required: "El título es requerido" })}
            autoFocus
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          
          <label className="font-bold text-xl" htmlFor="description">
            Descripcion
          </label>
          <input
            rows={3}
            {...register("description", { required: "La descripción es requerida" })}
            placeholder="Descripcion"
            className="w-full bg-zinc-700 text-white px-4 py-10 rounded-md my-2"
          ></input>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}

          <label className="font-bold text-xl" htmlFor="date">
            Fecha
          </label>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="date"
            {...register("date")}
          />

          <button className="bg-green-500 hover:bg-green-700 transition-all ease-in-out p-2 rounded-md text-xl font-semibold">
            Guardar
          </button>
          <button
            onClick={() => navigate("/tasks")}
            type="button"
            className=" hover:bg-slate-300 hover:text-black p-2 rounded-md text-lg transition-all ease-in-out"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskFormPage;
