import { BlogPost } from './blog-types';

export const BLOG_POSTS: BlogPost[] = [
  // Health Category
  {
    id: 1,
    title: "The Impact of Regular Exercise on Mental Health",
    slug: "exercise-mental-health-impact",
    excerpt: "Discover how regular physical activity can significantly improve your mental wellbeing, reduce stress, and enhance cognitive function.",
    content: "Regular exercise has been proven to have a profound impact on mental health...",
    coverImage: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg",
    date: "2025-03-15",
    readingTime: 8,
    categories: ["Health"],
    commentCount: 24,
    author: {
      name: "Dr. Sarah Chen",
      image: "https://images.pexels.com/photos/5214476/pexels-photo-5214476.jpeg",
      bio: "Clinical Psychologist specializing in health psychology and exercise science."
    }
  },
  {
    id: 2,
    title: "Understanding Sleep and Its Impact on Health",
    slug: "sleep-health-impact",
    excerpt: "Explore the crucial role of sleep in maintaining physical and mental health.",
    content: "Sleep is a fundamental biological process that affects every aspect of our health...",
    coverImage: "https://images.pexels.com/photos/1028741/pexels-photo-1028741.jpeg",
    date: "2025-03-14",
    readingTime: 10,
    categories: ["Health"],
    commentCount: 18,
    author: {
      name: "Dr. Emily Watson",
      image: "https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg",
      bio: "Sleep Specialist and Neuroscientist"
    }
  },
  // Travel Category
  {
    id: 3,
    title: "Hidden Gems of Southeast Asia",
    slug: "southeast-asia-hidden-gems",
    excerpt: "Discover lesser-known destinations in Southeast Asia that offer authentic experiences.",
    content: "Beyond the popular tourist spots, Southeast Asia harbors countless hidden treasures...",
    coverImage: "https://images.pexels.com/photos/1020016/pexels-photo-1020016.jpeg",
    date: "2025-03-13",
    readingTime: 12,
    categories: ["Travel"],
    commentCount: 32,
    author: {
      name: "Alex Rivera",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      bio: "Travel writer and photographer"
    }
  },
  {
    id: 4,
    title: "Sustainable Travel: A Guide to Eco-Tourism",
    slug: "sustainable-travel-guide",
    excerpt: "Learn how to minimize your environmental impact while exploring the world.",
    content: "Sustainable travel is more than just a trend...",
    coverImage: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg",
    date: "2025-03-12",
    readingTime: 15,
    categories: ["Travel"],
    commentCount: 27,
    author: {
      name: "Emma Green",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      bio: "Eco-tourism consultant"
    }
  },
  // Lifestyle Category
  {
    id: 5,
    title: "Minimalism: Living with Less",
    slug: "minimalism-living-with-less",
    excerpt: "Explore the benefits of minimalist living and how to start your journey.",
    content: "Minimalism isn't about deprivation, it's about intentionality...",
    coverImage: "https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg",
    date: "2025-03-11",
    readingTime: 9,
    categories: ["Lifestyle"],
    commentCount: 45,
    author: {
      name: "Sophie Chen",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      bio: "Lifestyle coach and minimalism expert"
    }
  },
  {
    id: 6,
    title: "Digital Wellness in the Modern Age",
    slug: "digital-wellness-guide",
    excerpt: "Find balance in your digital life with practical tips and strategies.",
    content: "In our increasingly connected world...",
    coverImage: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
    date: "2025-03-10",
    readingTime: 11,
    categories: ["Lifestyle"],
    commentCount: 38,
    author: {
      name: "David Park",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      bio: "Digital wellness consultant"
    }
  },
  // Inspiration Category
  {
    id: 7,
    title: "Finding Your Purpose: A Journey Within",
    slug: "finding-your-purpose",
    excerpt: "Discover practical steps to uncover your life's purpose and passion.",
    content: "The quest for purpose is a universal human experience...",
    coverImage: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg",
    date: "2025-03-09",
    readingTime: 13,
    categories: ["Inspiration"],
    commentCount: 56,
    author: {
      name: "Maria Rodriguez",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      bio: "Life coach and motivational speaker"
    }
  },
  {
    id: 8,
    title: "Overcoming Adversity: Stories of Resilience",
    slug: "overcoming-adversity",
    excerpt: "Real stories of people who turned challenges into opportunities.",
    content: "Adversity is an inevitable part of life...",
    coverImage: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg",
    date: "2025-03-08",
    readingTime: 14,
    categories: ["Inspiration"],
    commentCount: 42,
    author: {
      name: "James Wilson",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      bio: "Author and motivational coach"
    }
  },
  // Home & Family Category
  {
    id: 9,
    title: "Creating a Harmonious Family Environment",
    slug: "harmonious-family-environment",
    excerpt: "Tips for building strong family relationships and positive home atmosphere.",
    content: "The foundation of a happy home...",
    coverImage: "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg",
    date: "2025-03-07",
    readingTime: 10,
    categories: ["Home & Family"],
    commentCount: 33,
    author: {
      name: "Dr. Lisa Thompson",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      bio: "Family therapist and parenting expert"
    }
  },
  {
    id: 10,
    title: "Work-Life Balance for Parents",
    slug: "work-life-balance-parents",
    excerpt: "Strategies for managing career and family life effectively.",
    content: "Finding the right balance between work and family...",
    coverImage: "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg",
    date: "2025-03-06",
    readingTime: 12,
    categories: ["Home & Family"],
    commentCount: 29,
    author: {
      name: "Michael Brown",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      bio: "Work-life balance consultant"
    }
  },
  // Money-Matters Category
  {
    id: 11,
    title: "Smart Investing for Beginners",
    slug: "smart-investing-beginners",
    excerpt: "A comprehensive guide to starting your investment journey.",
    content: "Investment doesn't have to be complicated...",
    coverImage: "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg",
    date: "2025-03-05",
    readingTime: 15,
    categories: ["Money-Matters"],
    commentCount: 48,
    author: {
      name: "Robert Chen",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      bio: "Financial advisor and investment specialist"
    }
  },
  {
    id: 12,
    title: "Building Financial Security",
    slug: "building-financial-security",
    excerpt: "Essential steps to achieve long-term financial stability.",
    content: "Financial security is about more than just savings...",
    coverImage: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg",
    date: "2025-03-04",
    readingTime: 11,
    categories: ["Money-Matters"],
    commentCount: 39,
    author: {
      name: "Sarah Martinez",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      bio: "Personal finance expert"
    }
  },
  // Food Category
  {
    id: 13,
    title: "Healthy Cooking Made Simple",
    slug: "healthy-cooking-simple",
    excerpt: "Quick and nutritious recipes for busy professionals.",
    content: "Eating healthy doesn't have to be time-consuming...",
    coverImage: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
    date: "2025-03-03",
    readingTime: 8,
    categories: ["Food"],
    commentCount: 52,
    author: {
      name: "Chef Maria Garcia",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      bio: "Nutritionist and culinary expert"
    }
  },
  {
    id: 14,
    title: "World Cuisines: A Cultural Journey",
    slug: "world-cuisines-journey",
    excerpt: "Explore diverse culinary traditions from around the globe.",
    content: "Food is a universal language that connects cultures...",
    coverImage: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
    date: "2025-03-02",
    readingTime: 13,
    categories: ["Food"],
    commentCount: 44,
    author: {
      name: "Thomas Lee",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      bio: "Food historian and chef"
    }
  },
  // Retirement Category
  {
    id: 15,
    title: "Planning for a Fulfilling Retirement",
    slug: "fulfilling-retirement-planning",
    excerpt: "Comprehensive guide to preparing for your retirement years.",
    content: "Retirement planning goes beyond financial preparation...",
    coverImage: "https://images.pexels.com/photos/7148620/pexels-photo-7148620.jpeg",
    date: "2025-03-01",
    readingTime: 14,
    categories: ["Retirement"],
    commentCount: 36,
    author: {
      name: "Dr. William Taylor",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      bio: "Retirement planning specialist"
    }
  },
  {
    id: 16,
    title: "Active Aging: Staying Vibrant in Retirement",
    slug: "active-aging-retirement",
    excerpt: "Tips for maintaining an active and engaging lifestyle in retirement.",
    content: "Retirement is an opportunity for new adventures...",
    coverImage: "https://images.pexels.com/photos/7148964/pexels-photo-7148964.jpeg",
    date: "2025-02-28",
    readingTime: 10,
    categories: ["Retirement"],
    commentCount: 31,
    author: {
      name: "Elizabeth Wong",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      bio: "Active aging consultant"
    }
  }
];