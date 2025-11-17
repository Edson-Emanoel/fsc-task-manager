import { Toaster } from "sonner"

import Sidebar from "./components/Sidebar"
import Tasks from "./components/Tasks"

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
