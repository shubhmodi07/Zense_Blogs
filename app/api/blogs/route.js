import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.formData();
    const title = data.get('title');
    const content = data.get('content');
    const category = data.get('category');

    if (!title || !content || !category) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newPost = {
      title,
      slug: title.replace(/\s+/g, '-').toLowerCase(),
      excerpt: content.substring(0, 100),
      content,
      coverImage: 'https://images.unsplash.com/photo-1586339903043-0e48d167116f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      date: new Date().toISOString(),
      readingTime: 5,
      categories: [category],
      commentCount: 0,
      author: {
        name: 'John Doe',
        image: 'https://images.unsplash.com/photo-1570295999680-0b97926c2e05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
        bio: 'A passionate writer',
      },
    };

    const filePath = path.join(process.cwd(), 'data', `${title.replace(/\s+/g, '-')}.json`);
    await writeFile(filePath, JSON.stringify(newPost, null, 2));

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ message: 'Error creating post' }, { status: 500 });
  }
}
