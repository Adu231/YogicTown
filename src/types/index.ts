export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'instructor' | 'organizer' | 'coach' | 'admin';
  bio?: string;
  phone?: string;
  location?: string;
  joinedAt: string;
  subscription?: 'free' | 'basic' | 'premium' | 'elite';
  wellnessGoals?: string[];
  yogaLevel?: 'beginner' | 'intermediate' | 'advanced';
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  specialty: string[];
  rating: number;
  reviews: number;
  experience: string;
  price: number;
  verified: boolean;
  bio: string;
  classes: number;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  sessions: number;
  rating: number;
  enrolled: number;
  thumbnail: string;
  price: number;
  category: string;
  isFree?: boolean;
}

export interface Retreat {
  id: string;
  title: string;
  location: string;
  dates: string;
  price: number;
  rating: number;
  spots: number;
  image: string;
  instructor: string;
  highlights: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  category: string;
  readTime: string;
  publishedAt: string;
  thumbnail: string;
  tags: string[];
}

export interface WellnessStats {
  yogaSessions: number;
  meditationMinutes: number;
  streakDays: number;
  wellnessScore: number;
  weeklyGoal: number;
  weeklyCompleted: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}
