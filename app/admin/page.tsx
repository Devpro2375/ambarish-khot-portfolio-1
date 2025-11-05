'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  LayoutDashboard,
  FileText,
  Lightbulb,
  Mail,
  MessageSquare,
  LogOut,
  TrendingUp,
  Users,
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    insights: 0,
    contacts: 0,
    feedback: 0,
    newContacts: 0,
    newFeedback: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, insightsRes, contactsRes, feedbackRes] = await Promise.all([
        fetch('/api/projects?all=true'),
        fetch('/api/insights?all=true'),
        fetch('/api/contact'),
        fetch('/api/feedback'),
      ]);

      const [projects, insights, contacts, feedback] = await Promise.all([
        projectsRes.json(),
        insightsRes.json(),
        contactsRes.json(),
        feedbackRes.json(),
      ]);

      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        insights: Array.isArray(insights) ? insights.length : 0,
        contacts: Array.isArray(contacts) ? contacts.length : 0,
        feedback: Array.isArray(feedback) ? feedback.length : 0,
        newContacts: Array.isArray(contacts) ? contacts.filter((c: any) => c.status === 'new').length : 0,
        newFeedback: Array.isArray(feedback) ? feedback.filter((f: any) => f.status === 'new').length : 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const dashboardCards = [
    {
      title: 'Projects',
      count: stats.projects,
      icon: FileText,
      href: '/admin/projects',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      description: 'Manage portfolio projects',
    },
    {
      title: 'Insights',
      count: stats.insights,
      icon: Lightbulb,
      href: '/admin/insights',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      description: 'Manage articles & publications',
    },
    {
      title: 'Contact Submissions',
      count: stats.contacts,
      icon: Mail,
      href: '/admin/contact',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      description: `${stats.newContacts} new submission${stats.newContacts !== 1 ? 's' : ''}`,
    },
    {
      title: 'Feedback',
      count: stats.feedback,
      icon: MessageSquare,
      href: '/admin/feedback',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      description: `${stats.newFeedback} new feedback`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-background border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-foreground text-background rounded-lg">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-serif text-xl font-bold text-foreground">
                  Admin Panel
                </h1>
                <p className="text-xs text-muted-foreground">Content Management System</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
            Dashboard Overview
          </h2>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your content.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {dashboardCards.map((card) => (
                <Link key={card.title} href={card.href}>
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group border-2 hover:border-foreground/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-3 rounded-xl ${card.bgColor}`}>
                          <card.icon className={`h-6 w-6 ${card.color}`} />
                        </div>
                        <TrendingUp className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {card.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-foreground mb-1">
                        {card.count}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {card.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Content Management
                  </CardTitle>
                  <CardDescription>
                    Manage your projects and insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/admin/projects">
                    <Button variant="outline" className="w-full justify-start hover:bg-blue-50 dark:hover:bg-blue-900/20">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      Manage Projects ({stats.projects})
                    </Button>
                  </Link>
                  <Link href="/admin/insights">
                    <Button variant="outline" className="w-full justify-start hover:bg-amber-50 dark:hover:bg-amber-900/20">
                      <Lightbulb className="h-4 w-4 mr-2 text-amber-600" />
                      Manage Insights ({stats.insights})
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Submissions
                  </CardTitle>
                  <CardDescription>
                    Review contact forms and feedback
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/admin/contact">
                    <Button variant="outline" className="w-full justify-start hover:bg-green-50 dark:hover:bg-green-900/20">
                      <Mail className="h-4 w-4 mr-2 text-green-600" />
                      Contact Submissions
                      {stats.newContacts > 0 && (
                        <span className="ml-auto bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                          {stats.newContacts} new
                        </span>
                      )}
                    </Button>
                  </Link>
                  <Link href="/admin/feedback">
                    <Button variant="outline" className="w-full justify-start hover:bg-purple-50 dark:hover:bg-purple-900/20">
                      <MessageSquare className="h-4 w-4 mr-2 text-purple-600" />
                      Feedback Submissions
                      {stats.newFeedback > 0 && (
                        <span className="ml-auto bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                          {stats.newFeedback} new
                        </span>
                      )}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-900 dark:text-blue-100">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                <p>• Click on any card to manage that section</p>
                <p>• Use the toggle switches to publish/unpublish content</p>
                <p>• New submissions appear in real-time on the dashboard</p>
                <p>• Changes to content reflect immediately on the website</p>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
