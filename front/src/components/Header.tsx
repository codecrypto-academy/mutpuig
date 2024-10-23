import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "@/App";
import { Button } from "./ui/button";
import { stat } from "fs";

export function Header() {
  const {state, setState} = useContext(UserContext)
  useEffect( () =>{
    const ethereum = (window as any).ethereum
    if (ethereum == null) {
      alert("Instala el metamask");
      return;
    }
    //Si la cuenta cambia se lanza el evento, actualizamos la cuenta
    ethereum.on("accountsChanged", function(acc:string[]) {
      setState({account:acc[0]})
    })
    
    ethereum.request({method: "eth_requestAccounts"}).then((acc:string[]) => {
      
      setState({account:acc[0]})
    })
  }, [setState])

    return <div className="flex gap-3 pt-4">
      <Link to='Home'><Button>Home</Button></Link>
      <Link to='Faucet'><Button>Faucet</Button></Link>
      <Link to='Balance'><Button>Balance</Button></Link>
      <Link to='Transfer'><Button>Transfer</Button></Link>
      <div className="flex gap-3 pt-2"> {state.account ? <p>Cuenta: {state.account}</p> : <p>Cuenta no seleccionada</p>} </div>
    </div>
  }