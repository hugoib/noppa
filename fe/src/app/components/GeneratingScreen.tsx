import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function GeneratingScreen() {
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    'Designing the interface…',
    'Writing the logic…',
    'Adding the PWA shell…',
    'Almost ready…',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    const timeout = setTimeout(() => {
      navigate('/preview');
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Top Bar */}
      <div className="flex items-center px-4 pt-11 pb-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 -ml-2"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Centered Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Pulsing Ring */}
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full bg-[#FF6B6B] opacity-20 animate-ping absolute" />
          <div className="w-20 h-20 rounded-full border-4 border-[#FF6B6B] relative" />
        </div>

        {/* Status Text */}
        <h2 className="text-xl font-semibold mb-3">Building your app…</h2>

        {/* Rotating Messages */}
        <p className="text-gray-500 text-center min-h-[24px] transition-opacity duration-300">
          {messages[messageIndex]}
        </p>

        {/* Time Estimate */}
        <p className="text-sm text-gray-400 mt-8">Usually 20–30 seconds</p>
      </div>

      {/* Cancel Button */}
      <div className="pb-12 px-4 text-center">
        <button
          onClick={() => navigate('/')}
          className="text-gray-600 text-base active:scale-[0.97] transition-transform duration-150"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
