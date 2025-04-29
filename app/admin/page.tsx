'use client';

import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from 'lucide-react';
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

export default function AdminPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    coverImage: null as File | null, // Change to File | null for file upload
    category: '',
    authorName: '',
    authorImage: '',
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
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('excerpt', formData.excerpt);
      if (formData.coverImage) {
        data.append('coverImage', formData.coverImage);
      }
      data.append('category', formData.category);
      data.append('authorName', formData.authorName);
      data.append('authorImage', formData.authorImage);
      data.append('date', formData.date);


      const uploadResponse = await fetch('/api/upload-image', {
        method: 'POST',
        body: data,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        alert(`Failed to upload image: ${errorData.message || 'Unknown error'}`);
        setIsSubmitting(false);
        return;
      }

      const uploadResult = await uploadResponse.json();
      const imageUrl = uploadResult.filename; // Assuming the backend returns the filename or URL

      // Now submit the blog post data with the image URL
      const blogPostResponse = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          coverImage: imageUrl, // Use the uploaded image URL
        }),
      });


      if (blogPostResponse.ok) {
        alert('Blog post created successfully!');
        router.push('/blog');
      } else {
        const errorData = await blogPostResponse.json();
        alert(`Failed to create blog post: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Failed to create blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setFormData(prev => ({ ...prev, [name]: files[0] }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <Input
                    id="coverImage"
                    name="coverImage"
                    type="file" // Change input type to file
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData(prev => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
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
