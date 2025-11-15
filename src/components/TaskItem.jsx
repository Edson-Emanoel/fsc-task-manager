const TaskItem = ({ task, variant }) => {
  const getStatusClasses = () => {
    if (variant === "done") {
      return "bg-[#00ADB5] bg-opacity-10 text-[#00ADB5]";
    }
    if (variant === "in_progress") {
      return "bg-[#FFAA04] bg-opacity-10 text-[#FFAA04]";
    }
    if (variant === "not_started") {
      return "bg-[#35383E] bg-opacity-10 text-[#35383E]";
    }
  };
  return (
    <div className={`${getStatusClasses()} rounded-lg px-4 py-3`}>
      <span className="bg-opacity-45">{task.title}</span>
    </div>
  );
};

export default TaskItem;
