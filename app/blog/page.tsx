'use client';

import React, { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BlogHeader from '@/components/blog/BlogHeader';
import FeaturedPostsCarousel from '@/components/blog/FeaturedPostsCarousel';
import PostCard from '@/components/blog/PostCard';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import { useEffect } from 'react';
import { BlogPost } from '@/lib/blog-types';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/app/api/blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogPosts(data);
        } else {
          console.error('Failed to fetch blog posts');
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);
  
  const filteredPosts = blogPosts.filter(post => 
    post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.categories?.some(category => 
      category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Get featured posts (first 3 posts from each category)
  const featuredPosts = Array.from(new Set(blogPosts.flatMap(post => post.categories)))
    .map(category => blogPosts.find(post => post.categories.includes(category)))
    .filter((post): post is NonNullable<typeof post> => post !== undefined)
    .slice(0, 3);

  const regularPosts = filteredPosts.filter(post => !featuredPosts.includes(post));
  
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
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(category === 'All' ? regularPosts : regularPosts.filter(post => 
                  post.categories?.includes(category)
                )).map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
              
              {(category === 'All' ? regularPosts : regularPosts.filter(post => 
                post.categories.includes(category)
              )).length === 0 && (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium">No posts found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
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
