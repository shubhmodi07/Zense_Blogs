'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog-types';
import {
  ArrowLeft, Calendar, Clock, Facebook, Twitter, Linkedin,
  Heart, Bookmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BlogHeader from '@/components/blog/BlogHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import ReactMarkdown from 'react-markdown';

export default function BlogPostPage() {
  const { slug } = useParams() as { slug: string };
  const [post, setPost] = useState<BlogPost & { id: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blogs?slug=${slug}`);
        if (!res.ok) throw new Error('Blog post not found');
        const data = await res.json();
        setPost(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20 text-xl font-semibold">Loading...</div>;
  }

  if (error || !post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p>{error}</p>
        <Button className="mt-4" onClick={() => router.push('/blog')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to blog
          </Link>
        </Button>

        {/* Categories */}
        <div className="flex gap-2 mb-4">
          {Array.isArray(post.category) ? (
            post.category.map((cat) => (
              <Badge key={cat}>{cat}</Badge>
            ))
          ) : (
            <Badge>{post.category}</Badge>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {/* Author & Meta */}
        <div className="flex items-center gap-4 mb-8 text-sm text-muted-foreground">
          <Avatar>
            <AvatarImage src={post.authorImage} />
            <AvatarFallback>{post.authorName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{post.authorName}</span>
          <Calendar className="w-4 h-4" />
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <Clock className="w-4 h-4" />
          <span>{post.readingTime || 4} min read</span>
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Blog Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {/* Social Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() =>
              window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`, '_blank')
            }
          >
            <Twitter className="h-4 w-4 mr-2" />
            Tweet
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')
            }
          >
            <Facebook className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              window.open(`https://www.linkedin.com/shareArticle?url=${shareUrl}`, '_blank')
            }
          >
            <Linkedin className="h-4 w-4 mr-2" />
            LinkedIn
          </Button>
        </div>

        {/* Bookmark & Like */}
        <div className="flex gap-4 mt-4">
          <Button
            variant={isLiked ? 'default' : 'outline'}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className="h-4 w-4 mr-2" />
            {isLiked ? 'Liked' : 'Like'}
          </Button>
          <Button
            variant={isSaved ? 'default' : 'outline'}
            onClick={() => setIsSaved(!isSaved)}
          >
            <Bookmark className="h-4 w-4 mr-2" />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
        </div>

        <Separator className="my-10" />
        <BlogNewsletter />
      </main>
    </div>
  );
}
