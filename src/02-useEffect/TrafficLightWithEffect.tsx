import { useState, useEffect } from 'react'

const lightColors = {
    red: 'bg-red-500 animate-pulse',
    yellow: 'bg-yellow-500 animate-pulse',
    green: 'bg-green-500 animate-pulse',
    gray: 'bg-gray-500',
};

type LightColor = 'green' | 'yellow' | 'red';

export const TrafficLightWithEffect = () => {
    const [light, setLight] = useState<LightColor>('green');
    const [countDown, setCountDown] = useState<number>(5);

    useEffect(() => {
        if (countDown === 0) return;

        const intervalId = setInterval(() => {
            setCountDown(prev => prev - 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [countDown]);

    useEffect(() => {
        if (countDown > 0) return;

        setCountDown(5);

        if (light === 'green') {
            setLight('yellow');
            return;
        }

        if (light === 'yellow') {
            setLight('red');
            return;
        }

        if (light === 'red') {
            setLight('green');
            return;
        }
    }, [countDown, light]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
            <div className="flex flex-col items-center space-y-8">
                <h1 className="text-white text-3xl font-thin">Semáforo con useEffect</h1>
                {/* <h2 className="text-white text-xl">{ countDown }</h2> */}

                <div className="w-64 bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 rounded-full h-2 transition-all duration-1000 ease-linear" style={ { width: `${(countDown / 5) * 100}%` } }></div>
                </div>

                <div className={ `w-32 h-32 ${ light === 'red' ? lightColors[light] : lightColors.gray } rounded-full` }></div>
                <div className={ `w-32 h-32 ${ light === 'yellow' ? lightColors[light] : lightColors.gray } rounded-full` }></div>
                <div className={ `w-32 h-32 ${ light === 'green' ? lightColors[light] : lightColors.gray } rounded-full` }></div>
            </div>
        </div>
    );
}