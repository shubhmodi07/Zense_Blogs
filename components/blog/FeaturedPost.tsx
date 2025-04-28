import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { BlogPost } from '@/lib/blog-types';

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <div className="rounded-xl overflow-hidden bg-card transition-all duration-200 group relative">
      <div className="flex flex-col lg:flex-row">
        <div className="relative w-full lg:w-7/12 h-[280px] lg:h-[400px]">
          <Image 
            src={post.coverImage} 
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
        </div>
        
        <div className="relative lg:w-5/12 p-6 lg:p-8 flex flex-col h-full">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge className="bg-primary hover:bg-primary/90">Featured</Badge>
            {post.categories.map(category => (
              <Badge key={category} variant="secondary" className="hover:bg-secondary/80">
                {category}
              </Badge>
            ))}
          </div>
          
          <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h2>
          
          <p className="text-muted-foreground mb-6">{post.excerpt}</p>
          
          <div className="flex items-center space-x-4 mb-6 mt-auto">
            <Avatar>
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{post.author.name}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}</time>
                <span className="mx-1">•</span>
                <Clock className="mr-1 h-3 w-3" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
          
          <Button 
            asChild 
            className="group/button w-fit"
          >
            <Link href={`/blog/${post.slug}`}>
              Read article
              <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}