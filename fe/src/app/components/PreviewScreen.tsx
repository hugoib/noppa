import { ArrowLeft, Send, RotateCcw, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function PreviewScreen() {
  const navigate = useNavigate();
  const [refinement, setRefinement] = useState('');
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 pt-11 pb-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-base"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <div className="font-medium">Preview</div>
        <button
          onClick={() => navigate('/deployed')}
          className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white px-4 py-2 rounded-full text-sm font-medium active:scale-[0.97] transition-transform duration-150"
        >
          Deploy →
        </button>
      </div>

      {/* Banner */}
      {showBanner && (
        <div className="mx-4 mb-3 bg-[#FF6B6B] rounded-xl px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-white">Preview only · tap Deploy when ready</span>
          <button onClick={() => setShowBanner(false)}>
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* WebView Frame */}
        <div className="mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm" style={{ height: '490px' }}>
            {/* Mock App Preview */}
            <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Habit Tracker</h3>
                <p className="text-gray-600 text-sm">Your app preview appears here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Refinement Card */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">✦</span>
              <span className="text-sm font-medium text-gray-600">Refine · fast & cheap</span>
            </div>
            <div className="flex items-end gap-2">
              <input
                type="text"
                value={refinement}
                onChange={(e) => setRefinement(e.target.value)}
                placeholder="Make the buttons bigger…"
                className="flex-1 outline-none text-base py-2"
              />
              <button
                disabled={!refinement}
                className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white p-3 rounded-xl disabled:opacity-40 disabled:from-gray-300 disabled:to-gray-300 active:scale-[0.97] transition-transform duration-150"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <button className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 active:scale-[0.97] transition-transform duration-150">
            <RotateCcw className="w-5 h-5" />
            Regenerate
          </button>
          <button
            onClick={() => navigate('/deployed')}
            className="flex-1 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 active:scale-[0.97] transition-transform duration-150"
          >
            Deploy ↗
          </button>
        </div>
      </div>
    </div>
  );
}
