import { Search, Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function TemplatesScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const templates = [
    { id: 1, name: 'Habit Tracker', description: 'Track daily routines with streaks', color: '#FF6B6B', uses: '1.2k' },
    { id: 2, name: 'Recipe Manager', description: 'Organize and share recipes', color: '#4ECDC4', uses: '890' },
    { id: 3, name: 'Event RSVP', description: 'Manage guest lists and invites', color: '#95E1D3', uses: '654' },
    { id: 4, name: 'Budget Tracker', description: 'Monitor expenses and savings', color: '#FFD93D', uses: '2.1k' },
    { id: 5, name: 'Workout Log', description: 'Track exercises and progress', color: '#A8E6CF', uses: '1.5k' },
    { id: 6, name: 'Reading List', description: 'Keep track of books to read', color: '#FFB6C1', uses: '432' },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 pt-11 pb-4">
        <h1 className="text-2xl font-bold">Templates</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 active:scale-[0.97] transition-transform duration-150"
        >
          <Plus className="w-4 h-4" />
          Custom App
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-6">
        <div className="bg-[#F5F5F7] rounded-xl px-4 py-3 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates…"
            className="flex-1 bg-transparent outline-none text-base"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="grid grid-cols-2 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => navigate('/generating')}
              className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] active:scale-[0.97] transition-transform duration-150 text-left"
            >
              <div
                className="w-full aspect-square rounded-xl mb-3"
                style={{ backgroundColor: template.color }}
              />
              <div className="font-bold text-base mb-1">{template.name}</div>
              <div className="text-sm text-gray-500 line-clamp-2 mb-2">{template.description}</div>
              <div className="text-xs text-gray-400">{template.uses} uses</div>
            </button>
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
          <button
            onClick={() => navigate('/apps')}
            className="flex flex-col items-center gap-1 min-w-[60px]"
          >
            <div className="w-6 h-6 rounded-full bg-gray-300" />
            <span className="text-xs text-gray-500">Apps</span>
          </button>
          <button className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className="w-6 h-6 rounded-full bg-[#FF6B6B]" />
            <span className="text-xs font-medium text-[#FF6B6B]">Templates</span>
          </button>
        </div>
      </div>
    </div>
  );
}
