'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BlogHeader from '@/components/blog/BlogHeader';
import FeaturedPostsCarousel from '@/components/blog/FeaturedPostsCarousel';
import PostCard from '@/components/blog/PostCard';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import { BlogPost } from '@/lib/blog-types';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [blogPosts, setBlogPosts] = useState<(BlogPost & { id: string })[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<(BlogPost & { id: string })[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const data: (BlogPost & { id: string })[] = await response.json();
          setBlogPosts(data);
        } else {
          console.error('Failed to fetch blog posts from API');
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    const filtered = blogPosts.filter(post =>
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedPosts(filtered);
  }, [blogPosts, searchQuery]);

  const featuredPosts = blogPosts.slice(0, 3);

  const categories = [
    'All',
    'Health',
    'Travel',
    'Lifestyle',
    'Inspiration',
    'Home & Family',
    'Money-Matters',
    'Food',
    'Retirement'
  ];

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Insights and inspiration for a better life
            </p>
          </div>
          
          <div className="relative w-full md:w-64 lg:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {searchQuery === '' && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
            <FeaturedPostsCarousel posts={featuredPosts} />
          </div>
        )}

        <Tabs defaultValue="All" className="mt-16">
          <div className="border-b">
            <TabsList className="bg-transparent overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map((category) => {
            const currentPosts = category === 'All'
              ? displayedPosts
              : displayedPosts.filter(post => post.category?.trim().toLowerCase() === category.trim().toLowerCase());
            
            return (
              <TabsContent key={category} value={category} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>

                {currentPosts.length === 0 && (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-medium">No posts found</h3>
                    <p className="text-muted-foreground mt-2">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="group">
            Load more articles
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <BlogNewsletter />
      </main>
    </div>
  );
}
