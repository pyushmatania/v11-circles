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
<<<<<<< Updated upstream
  artist?: string;
  genre: string;
  perks: string[];
  rating?: number;
  investorCount?: number;
  trailer?: string;
  imageValidated?: boolean;
  imageSource?: string;
  status?: string; // e.g., 'active', 'disabled', etc.
  createdAt?: string; // ISO date string or similar
  updatedAt?: string; // ISO date string or similar
  movie?: string; // Movie name or ID
  keyPeople?: string[]; // Array of key people involved in the project
  actor?: string | string[]; // Main actor(s) in the project
  actress?: string | string[]; // Main actress(es) in the project
  productionHouse?: string; // Name of the production house
  targetAmountHuman?: string; // Human-readable target amount (e.g., '₹1 Crore')
  raisedAmountHuman?: string; // Human-readable raised amount (e.g., '₹50 Lakh')
  keyCommunityData?: unknown;
  disabled?: boolean;
  featured?: boolean;
=======
  genre: string;
  tags: string[];
  perks: string[];
  rating: number;
  trailer: string;
  movie?: string;
  keyPeople: unknown[];
  actor?: string;
  actress?: string;
  productionHouse?: string;
  targetAmountHuman?: string;
  raisedAmountHuman?: string;
  keyCommunityData?: Array<{
    id: string;
    movieId: string;
    movieName: string;
    productionHouse: string;
    keyPeople: unknown[];
    actor: string;
    actress: string;
    director: string;
  }>;
  disabled: boolean;
  featured?: boolean;
  budget?: number;
  cast?: string;
  artist?: string;
  timeLeft?: string;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

export interface Testimonial {
  name?: string;
  role?: string;
  content?: string;
  avatar?: string;
  project?: string;
  text?: string; // For testimonials with a 'text' field
  author?: string; // For testimonials with an 'author' field
  movie?: string; // For testimonials with a 'movie' field
  rating?: number; // For testimonials with a 'rating' field
}

export interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}