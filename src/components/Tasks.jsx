import Button from "./Button";
import TasksSeparator from "./TasksSeparator";
import AddIcon from "../assets/icons/add.svg?react";
import SunIcon from "../assets/icons/sun.svg?react";
import MoonIcon from "../assets/icons/moon.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import CloudSunIcon from "../assets/icons/cloud-sun.svg?react";

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minha Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost">
            Limpar tarefas
            <TrashIcon />
          </Button>

          <Button>
            Adicionar tarefa
            <AddIcon />
          </Button>
        </div>
      </div>

      {/* Lista de Tarefas */}

      <div className="rounded-xl bg-white p-6">
        {/* MANHÃ */}
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
        </div>

        {/* TARDE */}
        <div className="my-6 space-y-3">
          <TasksSeparator title="À Tarde" icon={<CloudSunIcon />} />
        </div>

        {/* NOITE */}
        <div className="space-y-3">
          <TasksSeparator title="À Noite" icon={<MoonIcon />} />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
