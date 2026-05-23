import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

export default function App() {
  return (
    <div className="size-full flex items-center justify-center bg-[#F5F5F7]">
      {/* iPhone Frame */}
      <div className="relative w-[390px] h-[844px] bg-white rounded-[48px] shadow-2xl overflow-hidden border-8 border-gray-900">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}