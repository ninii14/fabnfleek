import { useAppContext } from '../../context/AppContext';
import { Scissors, Tag, Image as ImageIcon, Users, Eye, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { services, promotions, gallery, team } = useAppContext();

  const stats = [
    { name: 'Total Services', value: services.length, icon: Scissors, color: 'text-brand-pink', bg: 'bg-brand-pink/10' },
    { name: 'Active Promotions', value: promotions.filter(p => p.status === 'Active').length, icon: Tag, color: 'text-brand-teal', bg: 'bg-brand-teal/10' },
    { name: 'Gallery Images', value: gallery.length, icon: ImageIcon, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { name: 'Team Members', value: team.length, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { name: 'Website Visitors', value: '0', icon: Eye, color: 'text-green-400', bg: 'bg-green-400/10', trend: '0%' },
    { name: 'Appointments', value: '0', icon: TrendingUp, color: 'text-orange-400', bg: 'bg-orange-400/10', trend: '0%' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening at Fab & Fleek.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-brand-card p-6 rounded-2xl border border-brand-border hover:border-brand-border/80 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <Icon size={24} className={stat.color} />
                </div>
                {stat.trend && (
                  <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                    {stat.trend}
                  </span>
                )}
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400 font-medium">{stat.name}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-brand-card rounded-2xl border border-brand-border p-6">
          <h2 className="text-xl font-serif font-bold mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {([] as any[]).map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className={`mt-1 ${activity.color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{activity.text}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
            <div className="text-center py-8 text-gray-500">No recent activity.</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-brand-card rounded-2xl border border-brand-border p-6">
          <h2 className="text-xl font-serif font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-xl border border-brand-border hover:bg-brand-bg transition-colors flex flex-col items-center justify-center gap-3 text-center group">
              <div className="w-10 h-10 rounded-full bg-brand-pink/10 flex items-center justify-center group-hover:bg-brand-pink/20 transition-colors">
                <Scissors size={20} className="text-brand-pink" />
              </div>
              <span className="text-sm font-medium text-gray-300">Add Service</span>
            </button>
            <button className="p-4 rounded-xl border border-brand-border hover:bg-brand-bg transition-colors flex flex-col items-center justify-center gap-3 text-center group">
              <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center group-hover:bg-brand-teal/20 transition-colors">
                <Tag size={20} className="text-brand-teal" />
              </div>
              <span className="text-sm font-medium text-gray-300">New Promo</span>
            </button>
            <button className="p-4 rounded-xl border border-brand-border hover:bg-brand-bg transition-colors flex flex-col items-center justify-center gap-3 text-center group">
              <div className="w-10 h-10 rounded-full bg-purple-400/10 flex items-center justify-center group-hover:bg-purple-400/20 transition-colors">
                <ImageIcon size={20} className="text-purple-400" />
              </div>
              <span className="text-sm font-medium text-gray-300">Upload Image</span>
            </button>
            <button className="p-4 rounded-xl border border-brand-border hover:bg-brand-bg transition-colors flex flex-col items-center justify-center gap-3 text-center group">
              <div className="w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center group-hover:bg-blue-400/20 transition-colors">
                <Users size={20} className="text-blue-400" />
              </div>
              <span className="text-sm font-medium text-gray-300">Add Staff</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
