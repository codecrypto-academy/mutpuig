import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Dashboard() {
    return (
      <div className='container'>
          <Header />
          <h1 className="text-xl">Bienvenido a mi sencillo proyecto</h1>
          <Outlet/>
      </div>
    )
  }