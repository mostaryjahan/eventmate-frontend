import { Button } from "@/components/ui/button";


export default function Home() {
  return (
   <div className="flex flex-col items-center justify-center h-screen">
 
    <h1 className="text-4xl font-semibold">Welcome to the Next.js Starter Template</h1>
    <p className="text-lg">This is a starter template for Next.js</p>
    <Button className="bg-red-500">Click Me</Button>
   </div>
  );
}
