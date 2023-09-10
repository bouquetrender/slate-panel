import SlatePanel from "./SlatePanel"

const App = () => {
  return (
    <div className='grid place-items-center h-full'>
      <div className='flex flex-col bg-zinc-100 rounded-sm shadow-sm w-[60%] max-w-[800px] h-[80%] overflow-hidden'>
        <SlatePanel />
      </div>
    </div>
  )
}

export default App
