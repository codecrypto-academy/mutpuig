import { UserContext } from "@/App"
import { useContext, useEffect, useState } from "react"

export function Balance() {
  const {state, setState} = useContext(UserContext)
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const ethereum = (window as any).ethereum
    if (ethereum == null) {
      alert("Instala el metamask");
      return;
    }

    ethereum.request({method:"eth_getBalance", params:[state.account]})
    .then((rbalance:string) => {
      setBalance(Number(rbalance)/10**18)
    })

  },[state.account])

  console.log(balance);
if (balance) {
  return (
    <div>
      <h1>El balance de la cuenta {state.account} es: {balance}</h1>
    </div>
    )
} else {
  return (
    <div>
      <h1>La cuenta {state.account} está pelada</h1>
    </div>
    )
}

  
}