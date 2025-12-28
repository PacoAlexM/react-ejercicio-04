import { useState, useEffect } from 'react'

const lightColors = {
    red: 'bg-red-500 animate-pulse',
    yellow: 'bg-yellow-500 animate-pulse',
    green: 'bg-green-500 animate-pulse',
    gray: 'bg-gray-500',
};

type LightColor = 'green' | 'yellow' | 'red';

export const useTrafficLight = () => {
    const [light, setLight] = useState<LightColor>('green');
    const [countDown, setCountDown] = useState<number>(5);

    useEffect(() => {
        if (countDown === 0) return;

        const intervalId = setInterval(() => {
            setCountDown(prev => prev - 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
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

    return {
        light,
        countDown,

        percentage: (countDown / 5) * 100,
        greenLight: light === 'green' ? lightColors.green : lightColors.gray,
        yellowLight: light === 'yellow'? lightColors.yellow : lightColors.gray,
        redLight: light === 'red' ? lightColors.red : lightColors.gray,
    }
}
