import { useTrafficLight } from '../hooks/useTrafficLight'

export const TrafficLightWithHooks = () => {
    const { percentage, greenLight, yellowLight, redLight } = useTrafficLight();
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
            <div className="flex flex-col items-center space-y-8">
                <h1 className="text-white text-3xl font-thin">Semáforo con useEffect y Hooks</h1>

                <div className="w-64 bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 rounded-full h-2 transition-all duration-1000 ease-linear" style={ { width: `${ percentage }%` } }></div>
                </div>

                <div className={ `w-32 h-32 ${ redLight } animate-pulse rounded-full` }></div>
                <div className={ `w-32 h-32 ${ yellowLight } animate-pulse rounded-full` }></div>
                <div className={ `w-32 h-32 ${ greenLight } animate-pulse rounded-full` }></div>
            </div>
        </div>
    );
}
