import { useState } from 'react'

const lightColors = {
    red: 'bg-red-500 animate-pulse',
    yellow: 'bg-yellow-500 animate-pulse',
    green: 'bg-green-500 animate-pulse',
    gray: 'bg-gray-500',
};

type LightColor = 'green' | 'yellow' | 'red';
// type LightColor = keyof typeof lightColors;

export const TrafficLight = () => {
    const [light, setLight] = useState<LightColor>('green');

    const handleColorChange = (color: LightColor) => {
        setLight(prev => {
            console.log({ prev });
            return color;
        });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
            <div className="flex flex-col items-center space-y-8">
                <div className={ `w-32 h-32 ${ light === 'red' ? lightColors[light] : lightColors.gray } rounded-full` }></div>
                <div className={ `w-32 h-32 ${ light === 'yellow' ? lightColors[light] : lightColors.gray } rounded-full` }></div>
                <div className={ `w-32 h-32 ${ light === 'green' ? lightColors[light] : lightColors.gray } rounded-full` }></div>

                <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={ () => handleColorChange('green') }>Verde</button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={ () => handleColorChange('yellow') }>Amarillo</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={ () => handleColorChange('red') }>Rojo</button>
                </div>
            </div>
        </div>
    );
}
