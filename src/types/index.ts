export interface Project {
  id: string;
  title: string;
  type: 'film' | 'music' | 'webseries';
  category: string;
  language: string;
  poster: string;
  fundedPercentage: number;
  targetAmount: number;
  raisedAmount: number;
  timeLeft?: string;
  tags: string[];
  description: string;
  director?: string;
  artist?: string;
  genre: string;
  perks: string[];
  rating?: number;
  investorCount?: number;
  trailer?: string;
  imageValidated?: boolean;
  imageSource?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  project?: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}