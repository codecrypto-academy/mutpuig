import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Dashboard } from "./components/Dashboard"
import { Home } from "./components/Home"
import { Balance } from "./components/Balance"
import { Faucet } from "./components/Faucet"
import { Transfer } from "./components/Transfer"
import { createContext, useState } from "react"

/*
curl --location "http://localhost:5556/" --header "Content-Type: application/json" --data "{\"jsonrpc\":\"2.0\",\"method\":\"eth_getBalance\",\"params\":[\"0x83cB55B13452A5759A345f203b8904657CC1372D\", \"latest\"],\"id\":1}"
*/

const router = createBrowserRouter([
  {path:'/', element: <Dashboard />,
    children : [
      {path: 'home', element:<Home /> },
      {path: 'faucet', element:<Faucet /> },
      {path: 'balance', element:<Balance /> },
      {path: 'transfer', element:<Transfer /> },
    ]
  }
])

export const UserContext = createContext({});

export default function App() {
  const [state, setState] = useState({
    account:"",

  })

  return (
    <UserContext.Provider value={{state, setState}}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  )
}