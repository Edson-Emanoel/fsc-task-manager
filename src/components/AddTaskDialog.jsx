import "./AddTaskDialog.css"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import PropTypes from "prop-types"
import { useRef } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 } from "uuid"

import { LoaderIcon } from "../assets/icons"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: "addTask",
    mutationFn: async (task) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
      })
      if (!response.ok) {
        throw new Error("Erro ao adicionar a tarefa")
      }
      return response.json()
    },
  })

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

  const nodeRef = useRef() // Usa para acessar o el. HTML, como por exemplo pegar o valor do input

  const handleSaveClick = async (data) => {
    // Jeito simples: const task = { ...data, id: v4(), status: "not_started" }
    // Jeito que ele faz:
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: "not_started",
    }

    mutate(task, {
      onSuccess: () => {
        // Atualiza o cache, adicionando a nova tarefa ao mesmo
        queryClient.setQueryData("tasks", (currentTasks) => {
          return [...currentTasks, task]
        })

        handleClose()

        reset({
          title: "",
          time: "morning",
          description: "",
        })

        toast.success("Tarefa adicionada com sucesso!")
      },
      onError: () =>
        toast.error("Erro ao adicionar a tarefa. Por favor, tente novamente"),
    })
  }

  const handleCancelClick = () => {
    reset({
      title: "",
      time: "morning",
      description: "",
    })
    handleClose()
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/10 backdrop-blur"
          >
            {/* Dialog */}
            <form
              className="rounded-xl bg-white p-5 text-center shadow"
              onSubmit={handleSubmit(handleSaveClick)}
            >
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  type="text"
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  errorMessage={errors?.title?.message}
                  disabled={isSubmitting}
                  {...register("title", {
                    required: "O Título é obrigatória",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "O Título não pode ser vazio"
                      }

                      return true
                    },
                  })}
                />

                <TimeSelect
                  {...register("time", {
                    required: "O período da taeefa é obrigatório",
                  })}
                  errorMessage={errors?.time?.message}
                  disabled={isSubmitting}
                />

                <Input
                  type="text"
                  id="description"
                  label="Descrição da Tarefa"
                  placeholder="Descreva a tarefa"
                  errorMessage={errors?.description?.message}
                  disabled={isSubmitting}
                  {...register("description", {
                    required: "A descrição é obrigatória",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "A Descrição não pode ser vazio"
                      }

                      return true
                    },
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={handleCancelClick}
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <LoaderIcon className="animate-spin" />}
                    Salvar
                  </Button>
                </div>
              </div>
            </form>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default AddTaskDialog
