import "./AddTaskDialog.css"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { v4 } from "uuid"

import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("morning")
  const [description, setDescription] = useState()
  const [errors, setErrors] = useState([])

  const nodeRef = useRef()

  useEffect(() => {
    if (!isOpen) {
      setTitle("")
      setTime("morning")
      setDescription("")
    }
  }, [isOpen])

  const handleSaveClick = () => {
    const newErrors = []

    if (!title.trim()) {
      newErrors.push({ inputName: "title", message: "O título é obrigatório" })
    }

    if (!time.trim()) {
      newErrors.push({ inputName: "time", message: "O horário é obrigatório" })
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória",
      })
    }

    setErrors(newErrors)

    if (newErrors.length > 0) {
      return
    }

    handleSubmit({
      id: v4(),
      title,
      time,
      description,
      status: "not_started",
    })

    handleClose()
  }

  const titleError = errors.find((error) => error.inputName === "title")
  const timeError = errors.find((error) => error.inputName === "time")
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  )

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
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-[#35383E]">
                Nova Tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-[#9A9C9F]">
                Insira as informações abaixo
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Insira o título da tarefa"
                  errorMessage={titleError?.message}
                />

                <TimeSelect
                  value={time}
                  errorMessage={timeError?.message}
                  onChange={(event) => setTime(event.target.value)}
                />

                <Input
                  id="description"
                  label="Descrição da Tarefa"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva a tarefa"
                  errorMessage={descriptionError?.message}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    variant="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={() => handleSaveClick()}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

export default AddTaskDialog
