import type { User } from '@/types';

const STORAGE_KEY = 'yogictown_user';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'user',
    bio: 'Yoga practitioner for 3 years. I love Vinyasa and morning meditation.',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    joinedAt: '2025-01-15',
    subscription: 'premium',
    wellnessGoals: ['Stress Relief', 'Flexibility', 'Better Sleep'],
    yogaLevel: 'intermediate',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    id: '2',
    name: 'Ananya Krishnan',
    email: 'instructor@example.com',
    role: 'instructor',
    bio: 'Certified RYT-500 yoga instructor with 8 years of experience in Vinyasa, Hatha & Kundalini yoga.',
    phone: '+91 87654 32109',
    location: 'Mumbai, India',
    joinedAt: '2024-06-10',
    subscription: 'elite',
    yogaLevel: 'advanced',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  },
  {
    id: '3',
    name: 'Rishikesh Wellness Center',
    email: 'organizer@example.com',
    role: 'organizer',
    bio: 'Premier yoga retreat and wellness center nestled in the foothills of the Himalayas.',
    phone: '+91 76543 21098',
    location: 'Rishikesh, India',
    joinedAt: '2024-03-22',
    subscription: 'elite',
    avatar: 'https://ui-avatars.com/api/?name=Rishikesh+Wellness&background=84A98C&color=fff',
  },
  {
    id: '4',
    name: 'Dr. Priya Nair',
    email: 'coach@example.com',
    role: 'coach',
    bio: 'Certified Ayurvedic nutritionist and holistic wellness coach with 10+ years of experience.',
    phone: '+91 65432 10987',
    location: 'Pune, India',
    joinedAt: '2024-09-05',
    subscription: 'elite',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
  {
    id: '5',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    bio: 'Platform administrator and operations manager for YogicTown.',
    phone: '+91 54321 09876',
    location: 'Delhi, India',
    joinedAt: '2024-01-01',
    subscription: 'elite',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=F4A261&color=fff',
  },
];

export function getCurrentUser(): User | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearCurrentUser(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getRoleDashboardPath(role: User['role']): string {
  switch (role) {
    case 'instructor': return '/instructor-dashboard';
    case 'organizer': return '/organizer-dashboard';
    case 'coach': return '/coach-dashboard';
    case 'admin': return '/admin-dashboard';
    default: return '/dashboard';
  }
}

export function login(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockUser = MOCK_USERS.find((u) => u.email === email);
      if (mockUser && password.length >= 6) {
        setCurrentUser(mockUser);
        resolve(mockUser);
      } else if (!mockUser) {
        const newUser: User = {
          id: Date.now().toString(),
          name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          email,
          role: 'user',
          joinedAt: new Date().toISOString(),
          subscription: 'free',
          yogaLevel: 'beginner',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=84A98C&color=fff`,
        };
        setCurrentUser(newUser);
        resolve(newUser);
      } else {
        reject(new Error('Password must be at least 6 characters'));
      }
    }, 1200);
  });
}

export function register(name: string, email: string, password: string, role: User['role'] = 'user'): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password.length < 6) {
        reject(new Error('Password must be at least 6 characters'));
        return;
      }
      const user: User = {
        id: Date.now().toString(),
        name,
        email,
        role,
        joinedAt: new Date().toISOString(),
        subscription: 'free',
        yogaLevel: 'beginner',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=84A98C&color=fff`,
      };
      setCurrentUser(user);
      resolve(user);
    }, 1400);
  });
}

export function logout(): void {
  clearCurrentUser();
}

export function sendPasswordReset(email: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Password reset email sent to ${email}`);
      resolve();
    }, 1000);
  });
}

export function updateProfile(updates: Partial<User>): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const current = getCurrentUser();
      if (!current) {
        reject(new Error('Not authenticated'));
        return;
      }
      const updated = { ...current, ...updates };
      setCurrentUser(updated);
      resolve(updated);
    }, 800);
  });
}
