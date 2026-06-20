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
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import type { Project } from '@/lib/types';

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    impact: '',
    tags: '',
    published: true,
    order_index: 0,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects?all=true');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch projects',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setSelectedProject(project);
      setFormData({
        title: project.title,
        category: project.category,
        description: project.description,
        impact: project.impact,
        tags: project.tags.join(', '),
        published: project.published,
        order_index: project.order_index,
      });
    } else {
      setSelectedProject(null);
      setFormData({
        title: '',
        category: '',
        description: '',
        impact: '',
        tags: '',
        published: true,
        order_index: projects.length,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      };

      const url = selectedProject
        ? `/api/projects/${selectedProject.id}`
        : '/api/projects';
      const method = selectedProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to save project');

      toast({
        title: 'Success',
        description: `Project ${selectedProject ? 'updated' : 'created'} successfully`,
      });

      setIsDialogOpen(false);
      fetchProjects();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save project',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProject) return;

    try {
      const response = await fetch(`/api/projects/${selectedProject.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      toast({
        title: 'Success',
        description: 'Project deleted successfully',
      });

      setIsDeleteDialogOpen(false);
      fetchProjects();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive',
      });
    }
  };

  const togglePublished = async (project: Project) => {
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...project, published: !project.published }),
      });

      if (!response.ok) throw new Error('Failed to update');

      toast({
        title: 'Success',
        description: `Project ${!project.published ? 'published' : 'unpublished'}`,
      });

      fetchProjects();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update project',
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
            Manage Projects
          </h1>
          <div className="w-32" />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
              Projects
            </h2>
            <p className="text-muted-foreground">{projects.length} total projects</p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline">{project.category}</Badge>
                        {project.published ? (
                          <Badge className="bg-green-500">Published</Badge>
                        ) : (
                          <Badge variant="secondary">Draft</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-foreground mb-1">Impact:</p>
                    <p className="text-sm text-muted-foreground">{project.impact}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={project.published}
                        onCheckedChange={() => togglePublished(project)}
                      />
                      <span className="text-sm text-muted-foreground">
                        {project.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(project)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedProject(project);
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProject ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Project title"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Product Development"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Project description"
                rows={4}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="impact">Impact</Label>
              <Input
                id="impact"
                value={formData.impact}
                onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                placeholder="e.g., $4M+ in cost savings"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="CFD, Innovation, Product Development"
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
              This action cannot be undone. This will permanently delete the project.
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
