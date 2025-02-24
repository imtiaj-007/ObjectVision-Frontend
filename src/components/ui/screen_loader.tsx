import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <section className="fixed top-0 left-0 z-50 h-screen w-screen bg-black/70 dark:bg-slate-900/50  backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center w-screen h-screen gap-8">
                {/* Neural Network Animation */}
                <div className="relative w-32 h-32">
                    {/* Connecting Lines */}
                    <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-[spin_4s_linear_infinite]">
                        <div className="absolute w-3 h-3 bg-cyan-500 rounded-full -right-1 top-1/2 animate-[pulse_2s_infinite]" />
                        <div className="absolute w-2 h-2 bg-cyan-400 rounded-full -left-1 top-1/3 animate-[pulse_2s_infinite_0.5s]" />
                        <div className="absolute w-2 h-2 bg-cyan-400 rounded-full -left-1 bottom-1/3 animate-[pulse_2s_infinite_1s]" />
                    </div>

                    {/* Inner Circuit */}
                    <div className="absolute inset-4 border-4 border-dashed border-cyan-400/40 rounded-full animate-[spin_7s_linear_infinite_reverse]">
                        <div className="absolute w-2 h-2 bg-cyan-400 rounded-full -top-1 left-1/2 animate-[pulse_2s_infinite_0.7s]" />
                        <div className="absolute w-2 h-2 bg-cyan-400 rounded-full -bottom-1 left-1/2 animate-[pulse_2s_infinite_1.2s]" />
                    </div>

                    {/* Center Core */}
                    <div className="absolute inset-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full animate-pulse">
                        <div className="absolute inset-2 bg-cyan-200 rounded-full animate-ping opacity-20" />
                    </div>
                </div>

                {/* Data Stream Progress Bar */}
                <div className="relative w-64 h-3 bg-slate-800 rounded-lg overflow-hidden">
                    {/* Binary Pattern Background */}
                    <div className="absolute inset-0 opacity-10 text-[8px] text-cyan-500 overflow-hidden whitespace-nowrap animate-[slideLeft_3s_linear_infinite]">
                        10110101 01101001 10110101 01101001
                    </div>

                    {/* Glowing Progress Bar */}
                    <div
                        className="absolute h-full w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500"
                        style={{
                            backgroundSize: '200% 100%',
                            animation: 'gradient 2s linear infinite, progressWidth 3s ease-in-out infinite alternate'
                        }}
                    >
                        <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_linear_infinite]" />
                    </div>
                </div>

                {/* Processing Text */}
                <div className="space-y-2 text-center">
                    <div className="text-lg font-medium text-cyan-500 tracking-wider">
                        Please Wait
                        <span className="inline-flex gap-1 ml-2">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-[bounce_1s_infinite]" />
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-[bounce_1s_infinite_0.2s]" />
                            <span className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-[bounce_1s_infinite_0.4s]" />
                        </span>
                    </div>
                </div>

                <style jsx>{`
          @keyframes gradient {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
          }
          @keyframes progressWidth {
            0% { width: 30%; }
            100% { width: 100%; }
          }
          @keyframes slideLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
            </div>
        </section>
    );
};

export default LoadingScreen;