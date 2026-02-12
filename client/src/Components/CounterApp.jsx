import React, { useState } from 'react'

export default function CounterApp() {

    const [count, setCount] = useState(0);

function increment() {
    setCount(count + 1);
}

function decrement() {
    setCount(count - 1);
}

  return (
    <>
    <div className='bg-blue-100 flex justify-center items-center min-h-screen flex-col gap-4'>
        <h1 className="text-3xl font-bold"> Counter App</h1>
        <p className="text-xl">Counter: {count}</p>
        <div className="flex gap-4">
        <button onClick={decrement} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Decrement</button>
        <button onClick={increment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Increment</button>
        </div>
        <button onClick={() => setCount(0)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Reset</button>
    </div>
    </>
  )

}
