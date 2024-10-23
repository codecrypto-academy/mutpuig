import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { ethers} from "ethers";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {useState} from "react";
import { Loader2 } from "lucide-react";



export function Transfer() {
  const [ti, setTi] = useState<object | null> (null);
  const [tf, setTf] = useState<object | null> (null);
  const form = useForm(
    {
      defaultValues: {
        origen:"",
        destino:"",
        cantidad:""
      }
    }
  );

  const onSubmit = async (data: any) => {
    setTi(null);
    setTf(null);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(data.origen)
    const t = await signer.sendTransaction({
      to: data.destino,
      value: ethers.parseEther(data.cantidad.toString())
    })
    setTi(t);
    const tf = await t.wait();
    setTf({t,tf,data});
    console.log(data);
  }

  return <div className="space-y-4 mt-3">
    <h1 className="text-xl font-bold">This is Transfer</h1>
    <p>Transfer your crypto money</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <FormField
          control={form.control}
          name="origen"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuenta origen</FormLabel>
              <FormControl>
                <Input placeholder="0x..." {...field} />
              </FormControl>
              <FormDescription>
                Cuenta origen de la transacción
              </FormDescription>
              <FormMessage />
            </FormItem>

          )}
        />
        <FormField
          control={form.control}
          name="destino"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuenta destino</FormLabel>
              <FormControl>
                <Input placeholder="0x..." {...field} />
              </FormControl>
              <FormDescription>
                Cuenta destino de la transacción
              </FormDescription>
              <FormMessage />
            </FormItem>

          )}

        />
        <FormField
          control={form.control}
          name="cantidad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Importe</FormLabel>
              <FormControl>
                <Input placeholder="1" {...field} />
              </FormControl>
              <FormDescription>
                Cantidad a transferir
              </FormDescription>
              <FormMessage />
            </FormItem>

          )}
        />
        <Button type="submit">Transfer</Button>

      </form>

    </Form>
    {
      ti && !tf && (
        <div>
          <h2>Realizando transacción... <Loader2 className="ml-2 h-4 w-4 animate-spin"/></h2>
        </div>
      )
    }
    {
      tf && (
        <div>
          <h2>Transacción finalizada</h2>
        <pre>{JSON.stringify(tf, null, 6)}</pre>
        </div>
      )
    }

  </div>
}