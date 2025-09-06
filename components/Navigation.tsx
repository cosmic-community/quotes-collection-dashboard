'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Quote, 
  Users, 
  Tag,
  BarChart3,
  Plus
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'All Quotes', href: '/quotes', icon: Quote },
  { name: 'Authors', href: '/authors', icon: Users },
  { name: 'Categories', href: '/categories', icon: Tag },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

const actions = [
  { name: 'Add Quote', href: '/quotes/new', icon: Plus },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-r border-gray-200 fixed left-0 top-16 bottom-0 w-64 overflow-y-auto z-30">
      <div className="p-6">
        <div className="space-y-8">
          {/* Main Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-1">
              {actions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <action.icon className="h-5 w-5" />
                  <span>{action.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}