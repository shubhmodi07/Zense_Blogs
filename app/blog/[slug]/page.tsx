'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, MessageSquare, Heart, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BlogHeader from '@/components/blog/BlogHeader';
import RelatedPosts from '@/components/blog/RelatedPosts';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import { BLOG_POSTS } from '@/lib/blog-data';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  
  const post = BLOG_POSTS.find(post => post.slug === params.slug);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Post not found</h1>
          <p className="mt-4 text-muted-foreground">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild className="mt-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter(
    p => p.slug !== post.slug && 
    p.categories.some(cat => post.categories.includes(cat))
  ).slice(0, 3);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to blog
          </Link>
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map(category => (
              <Badge key={category} variant="secondary" className="hover:bg-secondary/80 transition-colors">
                {category}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>
          
          <div className="flex items-center gap-x-4 mb-8">
            <Avatar>
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{post.author.name}</p>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</time>
                <span className="mx-1">•</span>
                <Clock className="mr-1 h-3 w-3" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
          
          <div className="relative w-full h-[500px] rounded-xl overflow-hidden mb-8">
            <Image 
              src={post.coverImage} 
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
          
          <div className="sticky top-24 float-left mr-8 hidden lg:flex flex-col gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "text-red-500 hover:text-red-600" : ""}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isLiked ? 'Unlike' : 'Like'} this article</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsSaved(!isSaved)}
                    className={isSaved ? "text-primary" : ""}
                  >
                    <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isSaved ? 'Remove from' : 'Save to'} bookmarks</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`, '_blank')}
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on Twitter</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on Facebook</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title}`, '_blank')}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed whitespace-pre-line">{post.content}</p>
          </article>
          
          <div className="flex lg:hidden items-center justify-between mt-8 mb-12">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500 hover:text-red-600" : ""}
              >
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                Like
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSaved(!isSaved)}
              >
                <Bookmark className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`, '_blank')}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title}`, '_blank')}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Separator className="my-12" />
          
          <div className="flex items-center gap-6 p-6 bg-muted rounded-lg">
            <Avatar className="h-20 w-20">
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-lg mb-2">Written by {post.author.name}</p>
              <p className="text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
        </div>
        
        <RelatedPosts posts={relatedPosts} />
        
        <BlogNewsletter />
      </main>
    </div>
  );
}