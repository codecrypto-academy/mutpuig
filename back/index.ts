//Para arrancar el programa hay que hacer npx nodemon index.ts

import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import {ethers, FetchCancelSignal} from 'ethers';
import fs from 'fs/promises';
//CARGA LAS VARIABLES DEL .ENV
require('dotenv').config();

const app = express();
//para que node reconozca el body como json
app.use(express.json())
app.use(cors())
const port = 3333;

//Comando para probarlo: curl localhost:3333/api/faucet/0x2C9a97cAcE3a0Fd92d7Dc0a5ffFa53ACeD2f5ffa/8

app.get("/api/faucet/:address/:amount", async (req:Request, res: Response) => {
    const {address, amount} = req.params;
    const provider = new ethers.JsonRpcProvider(process.env.KEYSTORE_NODE);
    //Clave privada del que hace la transferencia, el faucet consiste en usar la clave privada para hacer una transferencia
    const ruta = process.env.KEYSTORE_FILE as string;
    const rutaData = await fs.readFile(ruta, "utf8"); 

    //Vamos a crear una wallet con la información que hemos cogido
    const wallet = await ethers.Wallet.fromEncryptedJson(rutaData, process.env.KEYSTORE_PWD as string); //mete en memoria la wallet
    //Conectamos la wallet al provider
    const walletConnected = wallet.connect(provider);
    const transaction = await walletConnected.sendTransaction({
        to:address,
        value:ethers.parseEther(amount)
    })
    await transaction.wait();

    const newbalance = await provider.getBalance(address)

    res.json(
        {address, balance: Number(newbalance)/10**18, fecha: new Date().toISOString()}
    )
})
//Comando para probarlo: curl localhost:3333/eth/balance/0x83cB55B13452A5759A345f203b8904657CC1372D
//OBtenemos el balance de un addres usando libreria ethers
app.get("/eth/balance/:address", async (req:Request, res: Response) => {
    const {address} = req.params;
    const provider = new ethers.JsonRpcProvider(process.env.KEYSTORE_NODE)
    const balance = await provider.getBalance(address)
    res.json(
        {address, balance: Number(balance)/ 10**18, fecha: new Date().toISOString()}
    )

})

//Comando para probarlo: curl localhost:3333/api/balance/0x83cB55B13452A5759A345f203b8904657CC1372D
//Ejemplo de obtener el balance de una cuenta
app.get("/api/balance/:address", async (req:Request, res: Response) => {
    const {address} = req.params;
    const result = await fetch(process.env.KEYSTORE_NODE as string, {
        method:'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          jsonrpc:'2.0',
          method:'eth_getBalance',
          params: [
            address,
            'latest'
          ],
          id:1
        })
      })
      
      const data: any = await result.json();
      res.json(
        {  address, balance: Number(data.result)/10**18, fecha: new Date().toISOString()}
    );
})



app.get('/:p1/:p2', (req:Request, res: Response) => {
    res.send({p1:req.params.p1, p2:req.params.p2});
})



//Para probar el post
//curl -H "Content-Type: application/json" -d "{\"campoa\":1234}" http://localhost:3333
app.post('/', (req:Request, res: Response) => {
    const body = req.body
    res.send(
        body
        //`{"message":"Hello from post", "body":${JSON.stringify(body)}}`
    )
})

app.listen(port, () => {
    console.log(`Server is runing on port ${port}`)
});