import { cn } from '@/lib/utils';
import { Users, UserCheck } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  {
    title: 'Cleaners',
    icon: Users,
    href: '/dashboard/cleaners',
  },
  {
    title: 'Active Cleaners',
    icon: UserCheck,
    href: '/dashboard/active-cleaners',
  },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)]">
      <nav className="space-y-1 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}