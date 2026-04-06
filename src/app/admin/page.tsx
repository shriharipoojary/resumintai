'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatsData {
  overview: {
    totalUsers: number;
    totalResumes: number;
    newUsersThisMonth: number;
    newResumesThisMonth: number;
    activeUsersThisWeek: number;
  };
  recentLogins: Array<{
    id: string;
    loginAt: string;
    ipAddress: string | null;
    user: { name: string | null; email: string; image: string | null };
  }>;
  charts: {
    dailyUsers: Array<{ date: string; count: number }>;
    dailyResumes: Array<{ date: string; count: number }>;
    dailyActiveUsers: Array<{ date: string; count: number }>;
  };
}

const formatDate = (d: string) => {
  const date = new Date(d);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((data) => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  // Merge daily data for combo chart
  const combinedChartData = React.useMemo(() => {
    if (!stats) return [];
    const map: Record<string, { date: string; users: number; resumes: number; active: number }> = {};
    stats.charts.dailyUsers.forEach(({ date, count }) => {
      map[date] = { ...map[date], date: formatDate(date), users: count, resumes: 0, active: 0 };
    });
    stats.charts.dailyResumes.forEach(({ date, count }) => {
      if (map[date]) map[date].resumes = count;
      else map[date] = { date: formatDate(date), users: 0, resumes: count, active: 0 };
    });
    stats.charts.dailyActiveUsers.forEach(({ date, count }) => {
      if (map[date]) map[date].active = count;
      else map[date] = { date: formatDate(date), users: 0, resumes: 0, active: count };
    });
    return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
  }, [stats]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
        <div className="h-64 rounded-2xl bg-muted animate-pulse" />
      </div>
    );
  }

  if (!stats) return <p className="text-muted-foreground">Failed to load stats.</p>;

  const overviewCards = [
    { label: 'Total Users', value: stats.overview.totalUsers, icon: '👥', color: 'from-blue-500/15 to-blue-500/5', badge: `+${stats.overview.newUsersThisMonth} this month` },
    { label: 'Total Resumes', value: stats.overview.totalResumes, icon: '📄', color: 'from-purple-500/15 to-purple-500/5', badge: `+${stats.overview.newResumesThisMonth} this month` },
    { label: 'Active This Week', value: stats.overview.activeUsersThisWeek, icon: '⚡', color: 'from-amber-500/15 to-amber-500/5', badge: 'unique users' },
    { label: 'New Users (30d)', value: stats.overview.newUsersThisMonth, icon: '🆕', color: 'from-green-500/15 to-green-500/5', badge: 'last 30 days' },
    { label: 'New Resumes (30d)', value: stats.overview.newResumesThisMonth, icon: '📝', color: 'from-pink-500/15 to-pink-500/5', badge: 'last 30 days' },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics Overview</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Platform-wide statistics and activity</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {overviewCards.map((card) => (
          <Card key={card.label} className={`bg-gradient-to-br ${card.color} relative overflow-hidden`}>
            <div className="absolute top-2 right-2 text-xl opacity-50">{card.icon}</div>
            <div className="text-2xl font-bold text-foreground mb-0.5">{card.value.toLocaleString()}</div>
            <div className="text-xs font-medium text-foreground/80 mb-1">{card.label}</div>
            <Badge variant="secondary" className="text-[10px] h-4">{card.badge}</Badge>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* New Users per day */}
        <Card className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-foreground mb-4">New Users & Resumes (Last 30 Days)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={combinedChartData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
              <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="users" name="New Users" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resumes" name="New Resumes" fill="#a855f7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Active Users per day */}
        <Card>
          <h2 className="text-sm font-semibold text-foreground mb-4">Daily Active Users</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={combinedChartData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
              <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              <Line
                type="monotone"
                dataKey="active"
                name="Active Users"
                stroke="#ec4899"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Logins + Quick Links */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Recent Logins</h2>
            <Link href="/admin/users" className="text-xs text-primary hover:underline">View all users →</Link>
          </div>
          <div className="space-y-2">
            {stats.recentLogins.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">No logins recorded yet.</p>
            )}
            {stats.recentLogins.map((login) => (
              <div key={login.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                {login.user.image ? (
                  <img src={login.user.image} alt="" className="w-7 h-7 rounded-full shrink-0" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {login.user.name?.[0] ?? '?'}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{login.user.name ?? 'Unknown'}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{login.user.email}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-muted-foreground">{new Date(login.loginAt).toLocaleDateString()}</p>
                  <p className="text-[10px] text-muted-foreground">{new Date(login.loginAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-indigo-500/15 to-indigo-500/5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { href: '/admin/users', label: 'Manage Users', icon: '👥' },
                { href: '/admin/resumes', label: 'View All Resumes', icon: '📄' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-accent/60 transition-colors text-sm text-muted-foreground hover:text-foreground"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/15 to-green-500/5">
            <h3 className="text-sm font-semibold text-foreground mb-2">Platform Health</h3>
            <div className="space-y-2">
              {[
                { label: 'Auth', status: 'Operational' },
                { label: 'Database', status: 'Operational' },
                { label: 'API', status: 'Operational' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="flex items-center gap-1 text-green-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
