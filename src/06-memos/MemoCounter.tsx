import { useMemo } from 'react'
import { useCounter } from '../hooks/useCounter'

const heavyStuff = (iterationNumber: number) => {
    console.time('Heavy_stuff_started');

    for (let i: number = 0; i < iterationNumber; i++) {
        console.log('Ahi vamos...');
    }

    console.timeEnd('Heavy_stuff_started');

    return `${ iterationNumber } iteraciones realizadas.`;
}

export const MemoCounter = () => {
    const { counter, increment } = useCounter(300);
    const { counter: counter2, increment: increment2 } = useCounter(10);

    const myHeavyValue = useMemo(() => heavyStuff(counter), [counter]);

    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Memo - useMemo</h1>

            <hr />

            <h4>Counter: { counter }</h4>
            <h4>Counter: { counter2 }</h4>

            <button className="bg-red-400 px-4 py-2 rounded-md cursor-pointer" onClick={ increment }>+1</button>
            <button className="bg-blue-400 px-4 py-2 rounded-md cursor-pointer" onClick={ increment2 }>+1 Counter2</button>
        </div>
    );
}
