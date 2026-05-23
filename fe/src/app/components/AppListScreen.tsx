import { Search, Plus, Star, MoreVertical, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AppListScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const apps = [
    { id: 1, name: 'Habit Tracker', description: 'Daily routines and streaks with calendar view', color: '#FF6B6B', time: '2 hours ago', starred: true },
    { id: 2, name: 'Recipe Book', description: 'Save and share your favorite recipes', color: '#4ECDC4', time: '1 day ago', starred: false },
    { id: 3, name: 'Event RSVP', description: 'Guest list manager for your next party', color: '#95E1D3', time: '3 days ago', starred: true },
    { id: 4, name: 'Budget Planner', description: 'Track expenses and set savings goals', color: '#FFD93D', time: '1 week ago', starred: false },
    { id: 5, name: 'Workout Log', description: 'Exercise tracking and progress photos', color: '#A8E6CF', time: '2 weeks ago', starred: false },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 pt-11 pb-4">
        <h1 className="text-2xl font-bold">Apps</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 active:scale-[0.97] transition-transform duration-150"
        >
          <Plus className="w-4 h-4" />
          Create New App
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-4">
        <div className="bg-[#F5F5F7] rounded-xl px-4 py-3 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search apps…"
            className="flex-1 bg-transparent outline-none text-base"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="px-4 mb-4 flex gap-2">
        <button className="px-4 py-2 rounded-full bg-[#F5F5F7] text-sm font-medium flex items-center gap-1">
          Created by me
          <ChevronDown className="w-4 h-4" />
        </button>
        <button className="px-4 py-2 rounded-full bg-[#F5F5F7] text-sm font-medium flex items-center gap-1">
          Last updated
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* App List */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="space-y-3">
          {apps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] active:scale-[0.97] transition-transform duration-150"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-[52px] h-[52px] rounded-2xl flex-shrink-0"
                  style={{ backgroundColor: app.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-base mb-1">{app.name}</div>
                  <div className="text-sm text-gray-500 line-clamp-2 mb-2">{app.description}</div>
                  <div className="text-xs text-gray-400">{app.time}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button className="p-1">
                    <Star
                      className={`w-5 h-5 ${app.starred ? 'fill-[#FF6B6B] text-[#FF6B6B]' : 'text-gray-300'}`}
                    />
                  </button>
                  <button className="p-1">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="bg-white rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.12)] px-6 py-3 flex gap-12">
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-1 min-w-[60px]"
          >
            <div className="w-6 h-6 rounded-full bg-gray-300" />
            <span className="text-xs text-gray-500">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className="w-6 h-6 rounded-full bg-[#FF6B6B]" />
            <span className="text-xs font-medium text-[#FF6B6B]">Apps</span>
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
