'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import type { Insight } from '@/lib/types';

export default function InsightsAdmin() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    excerpt: '',
    date: '',
    category: '',
    read_time: '',
    author: 'Ambarish Khot',
    content: {
      introduction: '',
      sections: [{ title: '', content: [''] }],
      conclusion: '',
      keyFindings: [''],
    },
    published: true,
  });

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await fetch('/api/insights?all=true');
      const data = await response.json();
      setInsights(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch insights',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (insight?: Insight) => {
    if (insight) {
      setSelectedInsight(insight);
      setFormData({
        slug: insight.slug,
        title: insight.title,
        excerpt: insight.excerpt,
        date: insight.date,
        category: insight.category,
        read_time: insight.read_time,
        author: insight.author,
        content: insight.content,
        published: insight.published,
      });
    } else {
      setSelectedInsight(null);
      setFormData({
        slug: '',
        title: '',
        excerpt: '',
        date: '',
        category: '',
        read_time: '',
        author: 'Ambarish Khot',
        content: {
          introduction: '',
          sections: [{ title: '', content: [''] }],
          conclusion: '',
          keyFindings: [''],
        },
        published: true,
      });
    }
    setIsDialogOpen(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
      };

      const url = selectedInsight
        ? `/api/insights/${selectedInsight.id}`
        : '/api/insights';
      const method = selectedInsight ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to save insight');

      toast({
        title: 'Success',
        description: `Insight ${selectedInsight ? 'updated' : 'created'} successfully`,
      });

      setIsDialogOpen(false);
      fetchInsights();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save insight',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedInsight) return;

    try {
      const response = await fetch(`/api/insights/${selectedInsight.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      toast({
        title: 'Success',
        description: 'Insight deleted successfully',
      });

      setIsDeleteDialogOpen(false);
      fetchInsights();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete insight',
        variant: 'destructive',
      });
    }
  };

  const togglePublished = async (insight: Insight) => {
    try {
      const response = await fetch(`/api/insights/${insight.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...insight, published: !insight.published }),
      });

      if (!response.ok) throw new Error('Failed to update');

      toast({
        title: 'Success',
        description: `Insight ${!insight.published ? 'published' : 'unpublished'}`,
      });

      fetchInsights();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update insight',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-accent">
      <nav className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to Dashboard
          </Link>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Manage Insights
          </h1>
          <div className="w-32" />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
              Insights
            </h2>
            <p className="text-muted-foreground">{insights.length} total insights</p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Insight
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight) => (
              <Card key={insight.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{insight.title}</CardTitle>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <Badge variant="outline">{insight.category}</Badge>
                        <Badge variant="outline">{insight.read_time}</Badge>
                        {insight.published ? (
                          <Badge className="bg-green-500">Published</Badge>
                        ) : (
                          <Badge variant="secondary">Draft</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Slug: /insights/{insight.slug}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {insight.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={insight.published}
                          onCheckedChange={() => togglePublished(insight)}
                        />
                        <span className="text-sm text-muted-foreground">
                          {insight.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      {insight.published && (
                        <Link
                          href={`/insights/${insight.slug}`}
                          target="_blank"
                          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                        >
                          View Live <ExternalLink className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(insight)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedInsight(insight);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedInsight ? 'Edit Insight' : 'Add New Insight'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Insight title"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug (URL-friendly)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="auto-generated from title"
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Short summary"
                rows={3}
                className="mt-2"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="CFD & Simulation"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="Research Publication"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="read_time">Read Time</Label>
                <Input
                  id="read_time"
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                  placeholder="12 min read"
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="introduction">Introduction</Label>
              <Textarea
                id="introduction"
                value={formData.content.introduction}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, introduction: e.target.value },
                  })
                }
                placeholder="Introduction paragraph"
                rows={4}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="conclusion">Conclusion</Label>
              <Textarea
                id="conclusion"
                value={formData.content.conclusion}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, conclusion: e.target.value },
                  })
                }
                placeholder="Conclusion paragraph"
                rows={4}
                className="mt-2"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.published}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, published: checked })
                }
              />
              <Label>Published</Label>
            </div>
            <p className="text-xs text-muted-foreground">
              Note: Full content editor with sections can be added in a future update
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the insight.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
