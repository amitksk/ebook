import { Button } from "@/components/ui/button"

function App() {
  
  return (
    <>
      <div>
        <h1 className="bg-green-500 p-4 text-center">hello world!</h1>
      </div>
       <div className="flex justify-center">
          <Button variant={"destructive"}> Click me </Button>
        </div>
    </>
  )
}

export default App
