import { Menu, Bell, Mic, Send } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function HomeScreen() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState<'recent' | 'templates'>('recent');

  const categories = ['Tracker', 'Menu', 'Event', 'Portal', 'Finance', 'Habit'];

  const recentApps = [
    { id: 1, name: 'Habit Tracker', description: 'Daily routines & streaks', color: '#FF6B6B', time: '2h ago' },
    { id: 2, name: 'Recipe Book', description: 'Save & share recipes', color: '#4ECDC4', time: '1d ago' },
    { id: 3, name: 'Event RSVP', description: 'Guest list manager', color: '#95E1D3', time: '3d ago' },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 pt-11 pb-4">
        <button className="p-2 -ml-2">
          <Menu className="w-6 h-6" />
        </button>
        <div className="font-semibold">Noppa</div>
        <div className="flex items-center gap-2">
          <button className="p-2">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center text-white text-sm font-medium">
            H
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Greeting */}
        <div className="px-4 mt-4 mb-6">
          <h1 className="text-[28px] font-bold leading-tight">
            Hi Hugo, what will<br />you build?
          </h1>
        </div>

        {/* Prompt Input Card */}
        <div className="mx-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the app you want to create…"
              className="w-full min-h-[120px] resize-none outline-none text-base"
            />
            <div className="flex items-center justify-between mt-3">
              <button className="p-2 -ml-2">
                <Mic className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => prompt && navigate('/generating')}
                disabled={!prompt}
                className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white p-3 rounded-xl disabled:opacity-40 disabled:from-gray-300 disabled:to-gray-300 active:scale-[0.97] transition-transform duration-150"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Chips */}
        <div className="px-4 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setPrompt(`Create a ${category.toLowerCase()} app`)}
                className="px-4 py-2 rounded-full border border-gray-200 whitespace-nowrap text-sm active:scale-[0.97] transition-transform duration-150"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="px-4 mb-4">
          <div className="inline-flex bg-[#F5F5F7] rounded-full p-1">
            <button
              onClick={() => setActiveTab('recent')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'recent'
                  ? 'bg-white shadow-sm text-[#FF6B6B]'
                  : 'text-gray-600'
              }`}
            >
              Recent Apps
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'templates'
                  ? 'bg-white shadow-sm text-[#FF6B6B]'
                  : 'text-gray-600'
              }`}
            >
              Templates
            </button>
          </div>
        </div>

        {/* Recent Apps Horizontal Scroll */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 px-4 pb-4">
            {recentApps.map((app) => (
              <button
                key={app.id}
                onClick={() => navigate('/preview')}
                className="flex-shrink-0 w-[280px] bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] active:scale-[0.97] transition-transform duration-150"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-[52px] h-[52px] rounded-2xl flex-shrink-0"
                    style={{ backgroundColor: app.color }}
                  />
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-bold text-base mb-1">{app.name}</div>
                    <div className="text-sm text-gray-500 line-clamp-2">{app.description}</div>
                    <div className="text-xs text-gray-400 mt-2">{app.time}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="bg-white rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.12)] px-6 py-3 flex gap-12">
          <button className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className="w-6 h-6 rounded-full bg-[#FF6B6B]" />
            <span className="text-xs font-medium text-[#FF6B6B]">Home</span>
          </button>
          <button onClick={() => navigate('/apps')} className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className="w-6 h-6 rounded-full bg-gray-300" />
            <span className="text-xs text-gray-500">Apps</span>
          </button>
          <button onClick={() => navigate('/templates')} className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className="w-6 h-6 rounded-full bg-gray-300" />
            <span className="text-xs text-gray-500">Templates</span>
          </button>
        </div>
      </div>
    </div>
  );
}
