import { Toaster } from "sonner"
import Tasks from "./components/Tasks"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <div className="flex gap-9">
      <Toaster
        toastOptions={{
          style: {
            color: "#35383E",
          },
        }}
      />
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default App
