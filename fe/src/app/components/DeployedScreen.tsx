import { Check, Copy, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function DeployedScreen() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const appUrl = 'noppa.app/h/tracker-a7x9';

  useEffect(() => {
    setTimeout(() => setShowCheckmark(true), 100);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-white items-center justify-center px-4">
      {/* Success Animation */}
      <div
        className={`w-20 h-20 rounded-full bg-[#FF6B6B] flex items-center justify-center mb-6 transition-all duration-500 ${
          showCheckmark ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
        style={{
          transform: showCheckmark ? 'scale(1)' : 'scale(0.5)',
        }}
      >
        <Check className="w-10 h-10 text-white" strokeWidth={3} />
      </div>

      {/* Success Message */}
      <h1 className="text-2xl font-bold mb-12">Your app is live!</h1>

      {/* QR Code Card */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-6">
        <div className="w-[220px] h-[220px] bg-white border-4 border-gray-100 rounded-xl flex items-center justify-center relative">
          {/* Mock QR Code */}
          <div className="grid grid-cols-7 gap-1 p-4">
            {Array.from({ length: 49 }).map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
              />
            ))}
          </div>
          {/* Corner Markers in Coral */}
          <div className="absolute top-2 left-2 w-8 h-8 border-4 border-[#FF6B6B] rounded" />
          <div className="absolute top-2 right-2 w-8 h-8 border-4 border-[#FF6B6B] rounded" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-4 border-[#FF6B6B] rounded" />
        </div>
      </div>

      {/* URL Pill */}
      <button
        onClick={handleCopy}
        className="bg-[#F5F5F7] px-6 py-3 rounded-full mb-8 flex items-center gap-2 active:scale-[0.97] transition-transform duration-150"
      >
        <span className="font-mono text-sm">{appUrl}</span>
        {copied ? (
          <span className="text-[#FF6B6B] text-sm font-medium flex items-center gap-1">
            <Check className="w-4 h-4" />
            Copied
          </span>
        ) : (
          <Copy className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {/* Action Buttons */}
      <div className="flex gap-3 w-full max-w-sm mb-6">
        <button className="flex-1 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 active:scale-[0.97] transition-transform duration-150">
          <Share2 className="w-5 h-5" />
          Share
        </button>
        <button className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium active:scale-[0.97] transition-transform duration-150">
          Open in Safari
        </button>
      </div>

      {/* Instruction */}
      <div className="bg-[#F5F5F7] px-4 py-3 rounded-xl text-center max-w-sm">
        <p className="text-sm text-gray-600">
          Tap <span className="font-mono">⎙</span> then <span className="font-semibold">Add to Home Screen</span>
        </p>
      </div>

      {/* Back to Home */}
      <button
        onClick={() => navigate('/')}
        className="mt-8 text-[#FF6B6B] font-medium active:scale-[0.97] transition-transform duration-150"
      >
        Back to Home
      </button>
    </div>
  );
}
