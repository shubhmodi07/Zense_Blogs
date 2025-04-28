'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BlogHeader from '@/components/blog/BlogHeader';
import { useId } from 'react';

export default function AdminPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const id = useId();
  const [formData, setFormData] = useState({
    id,
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    category: '',
    authorName: '',
    authorImage: '',
    authorBio: '',
    date: new Date().toISOString().split('T')[0],
  });

  const categories = [
    'Health',
    'Travel',
    'Lifestyle',
    'Inspiration',
    'Home & Family',
    'Money-Matters',
    'Food',
    'Retirement'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', formData.id);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('excerpt', formData.excerpt);
      formDataToSend.append('coverImage', formData.coverImage);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('authorName', formData.authorName);
      formDataToSend.append('authorImage', formData.authorImage);
      formDataToSend.append('authorBio', formData.authorBio);
      formDataToSend.append('date', formData.date);

      const response = await fetch('/app/api/blogs', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        // Reset form after successful submission
        setFormData({
          id: useId(),
          title: '',
          content: '',
          excerpt: '',
          coverImage: '',
          category: '',
          authorName: '',
          authorImage: '',
          authorBio: '',
          date: new Date().toISOString().split('T')[0],
        });
        
        // Show success message or redirect
        alert('Blog post created successfully!');
        router.push('/blog');
      } else {
        const errorData = await response.json();
        alert(`Failed to create blog post: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Failed to create blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Create New Blog Post</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter blog post title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Enter a brief excerpt"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your blog post content"
                  className="min-h-[200px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image URL</Label>
                  <Input
                    id="coverImage"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Publication Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Author Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="authorName">Author Name</Label>
                    <Input
                      id="authorName"
                      name="authorName"
                      value={formData.authorName}
                      onChange={handleChange}
                      placeholder="Enter author name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="authorImage">Author Image URL</Label>
                    <Input
                      id="authorImage"
                      name="authorImage"
                      value={formData.authorImage}
                      onChange={handleChange}
                      placeholder="Enter author image URL"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="authorBio">Author Bio</Label>
                    <Textarea
                      id="authorBio"
                      name="authorBio"
                      value={formData.authorBio}
                      onChange={handleChange}
                      placeholder="Enter author bio"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Post'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
