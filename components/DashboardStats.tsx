import { Quote, Users, Tag, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
  quotesCount: number;
  authorsCount: number;
  categoriesCount: number;
}

export function DashboardStats({ 
  quotesCount, 
  authorsCount, 
  categoriesCount 
}: DashboardStatsProps) {
  const stats = [
    {
      name: 'Total Quotes',
      value: quotesCount,
      icon: Quote,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      name: 'Authors',
      value: authorsCount,
      icon: Users,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      name: 'Categories',
      value: categoriesCount,
      icon: Tag,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    {
      name: 'Growth',
      value: '+12%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div key={item.name} className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`${item.bgColor} p-3 rounded-lg`}>
                <item.icon className={`h-6 w-6 ${item.textColor}`} />
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">
                {item.name}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {item.value}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}