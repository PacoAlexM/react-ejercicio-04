import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

// import { Toaster } from 'sonner'

// import { HooksApp } from './HooksApp'
// import { TrafficLight } from './01-useState/TrafficLight'
// import { TrafficLightWithEffect } from './02-useEffect/TrafficLightWithEffect'
// import { TrafficLightWithHooks } from './02-useEffect/TrafficLightWithHooks'
// import { PokemonPage } from './03-examples/PokemonPage'
// import { FocusScreen } from './04-useRef/FocusScreen'
// import { TasksApp } from './05-useReducer/TasksApp'
// import { ScrambleWords } from './05-useReducer/ScrambleWords'
// import { MemoHook } from './06-memos/MemoHook'
// import { MemoCounter } from './06-memos/MemoCounter'
// import { InstagromApp } from './07-useOptimistic/InstagromApp'
import { ClientInformation } from './08-use-suspense/ClientInformation'
import './index.css'

import { getUserAction } from './08-use-suspense/api/get-user.action'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Toaster /> */}
    {/* <HooksApp /> */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <TrafficLightWithHooks /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    {/* <TasksApp /> */}
    {/* <ScrambleWords /> */}
    {/* <MemoHook /> */}
    {/* <MemoCounter /> */}
    {/* <InstagromApp /> */}
    <Suspense fallback={(
      <div className="bg-gradient flex flex-col">
        <h1 className="text-2xl flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
            <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3c4.97 0 9 4.03 9 9">
              <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
            </path>
          </svg> Cargando...
        </h1>
      </div>
    )}>
      <ClientInformation getUser={ getUserAction(1000) } /*id={ 100 }*/ />
    </Suspense>
  </StrictMode>,
)
