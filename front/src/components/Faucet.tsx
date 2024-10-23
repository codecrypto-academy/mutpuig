import {UserContext} from "@/App";
import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";


export function Faucet() {
  const {state, setState} = useContext(UserContext);
  const [tx, setTx] = useState<object | null>(null);
  const [loading, setloading] = useState(false);

  const fondos = 2;//Cantidad que se solicita

  async function handleFaucetClick() {
    //Marcamos el estado de cargando
    setloading(true)
    //Realizamos una llamada al servidor para solicitar fondos
    console.log("Fuacet clicked");
    //Llamamos la función ya creada en el index.ts del back
    const result = await fetch(`http://localhost:3333/api/faucet/${state.account}/`+fondos);
    const data = await result.json();
    setTx(data)
    setloading(false)
    console.log(data)
  }

  return <div className="space-y-2 mt-5">
    <h1 className="text-xl">Faucet</h1>
    <p>Cuenta: {state.account}</p>
    <Button onClick={async () => handleFaucetClick()}>
      Solicitar Fondos ({fondos})
     {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin"/> }
      </Button>
    {loading && <p>Loading...</p>}
    {tx && <p>Transacción: {JSON.stringify(tx, null, 4)}</p>}
  </div>
}


  