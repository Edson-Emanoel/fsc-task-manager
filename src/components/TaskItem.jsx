import { useMutation, useQueryClient } from "@tanstack/react-query"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { toast } from "sonner"

import {
  CheckIcon,
  DetailsIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons/index"
import Button from "../components/Button"

const TaskItem = ({ task, handleCheckboxClick }) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteTask", task.id],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "DELETE",
      })
      return response.json()
    },
  })

  const handleDeleteClick = async () => {
    mutate(undefined, {
      onSuccess: () => {
        // Filtra as tarefas do cache
        queryClient.setQueryData("tasks", (oldTasks) => {
          return oldTasks.filter((oldTask) => oldTask.id !== task.id)
        })
        toast.success("Tarefa deletada com sucesso!")
      },
      onError: (err) => {
        console.log("Erro ao deletar: " + err)
        toast.error("Erro ao deletar a tarefa!")
      },
    })
  }

  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-brand-primary text-brand-primary"
    }
    if (task.status === "in_progress") {
      return "bg-brand-process text-brand-process"
    }
    if (task.status === "not_started") {
      return "bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue"
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin text-brand-white" />
          )}
          {task.status === "not_started" && <></>}
        </label>

        <span className="bg-opacity-45">{task.title}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <LoaderIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        <Link to={`/task/${task.id}`} className="transition hover:opacity-75">
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(["morning", "afternoon", "evening"]).isRequired,
    status: PropTypes.oneOf(["done", "in_progress", "not_started"]).isRequired,
  }).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
}

export default TaskItem
