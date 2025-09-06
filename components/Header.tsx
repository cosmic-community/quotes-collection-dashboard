import { BookOpen } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-500 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Quotes Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Manage your literary collection
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}