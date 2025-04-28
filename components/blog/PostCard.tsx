import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BlogPost } from '@/lib/blog-types';

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col transform transition duration-300 hover:shadow-md hover:-translate-y-1">
      <Link 
        href={`/blog/${post.slug}`} 
        className="relative w-full h-48 block overflow-hidden"
      >
        <Image 
          src={post.coverImage} 
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>
      
      <CardContent className="pt-5 px-5 flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.slice(0, 2).map(category => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
          {post.categories.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{post.categories.length - 2}
            </Badge>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-3 transition-colors hover:text-primary line-clamp-2">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {post.excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="px-5 pt-0 pb-5 flex flex-col items-start gap-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.image} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium">{post.author.name}</p>
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
          variant="ghost" 
          className="p-0 h-auto font-medium hover:bg-transparent hover:text-primary group"
        >
          <Link href={`/blog/${post.slug}`}>
            Read more
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}