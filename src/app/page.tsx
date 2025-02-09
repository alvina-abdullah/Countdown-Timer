// components/CountdownTimer.tsx
'use client';
import React, { useEffect, useState } from 'react';

const CountdownTimer: React.FC = () => {
  const [duration, setDuration] = useState(0); // Duration in seconds
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleSetDuration = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (duration > 0) {
      setTimeLeft(duration);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      setIsRunning(false);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-md my-40 mx-auto p-6 bg-white rounded-lg shadow-md justify-items-center shadow-white shadow-md">
      <h1 className="text-2xl font-bold text-black text-center mb-4">Countdown Timer</h1>
      <form onSubmit={handleSetDuration} className="flex items-center justify-center space-x-2 mb-4">
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          placeholder="Enter duration in seconds"
          className="p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Set</button>
      </form>
      <div className="text-center text-5xl font-bold text-gray-800 mb-4">
        {formatTime(timeLeft)}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleStart}
          disabled={isRunning || timeLeft <= 0}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          disabled={!isRunning}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:bg-gray-300"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
