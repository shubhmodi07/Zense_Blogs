'use client';

import React, { useState } from 'react';
import { MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BlogNewsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your API
    setIsSubmitted(true);
  };
  
  return (
    <Card className="mt-16 bg-card shadow-none border-2">
      <CardContent className="p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
              Stay up to date
            </CardTitle>
            <CardDescription className="text-lg">
              Get notified when we publish new articles and updates. No spam, just content you'll actually want to read.
            </CardDescription>
          </div>
          
          <div>
            {isSubmitted ? (
              <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-lg text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <MailCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-medium">Thank you for subscribing!</h3>
                <p className="mt-2 text-muted-foreground">
                  Check your email for a confirmation link.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
                <Button type="submit" className="w-full h-12 text-base font-medium">
                  Subscribe to newsletter
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}