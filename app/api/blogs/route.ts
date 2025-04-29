import { NextRequest, NextResponse } from 'next/server';
import firebaseApp from '@/utils/firebase'; // Your Firebase app config
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  query,
  where,
  doc, // Import doc
  getDoc, // Import getDoc
} from 'firebase/firestore';

const db = getFirestore(firebaseApp);

interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  authorName: string;
  authorImage: string;
  date: string;
  slug: string; // Added slug field
}

// POST: Create a new blog post
export async function POST(req: NextRequest) {
  try {
    const newBlogPost = (await req.json()) as Omit<BlogPost, 'slug'>;

    // Validation
    if (
      !newBlogPost.title ||
      !newBlogPost.content ||
      !newBlogPost.category ||
      !newBlogPost.authorName
    ) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = newBlogPost.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-'); // Replace spaces with hyphens

    // Save blog to Firestore
    const docRef = await addDoc(collection(db, 'blogs'), {
      ...newBlogPost,
      slug,
    });

    return NextResponse.json(
      { message: 'Blog post created successfully', id: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET: Fetch all blog posts or a single blog post by slug
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    const blogsRef = collection(db, 'blogs');

    if (slug) {
      // Fetch single blog post by document ID
      const docRef = doc(db, 'blogs', slug);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json({ message: 'Post not found' }, { status: 404 });
      }

      const post = { id: docSnap.id, ...docSnap.data() };
      return NextResponse.json(post, { status: 200 });
    } else {
      // Fetch all blog posts
      console.log('Fetching all blog posts...');
      const snapshot = await getDocs(blogsRef);
      console.log('Fetched snapshot. Number of documents:', snapshot.docs.length);
      const posts = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log(`Processing document ${doc.id}:`, data);
        return {
          id: doc.id,
          slug: data.slug, // Explicitly include slug
          ...data,
        };
      });
      console.log('Mapped posts:', posts);
      return NextResponse.json(posts, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching blog post(s):', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
