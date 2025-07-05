import { Project } from '../types';

interface ImageData {
  url: string;
  title?: string;
  year?: number;
  tmdbId?: string;
  spotifyId?: string;
  imdbId?: string;
  attribution: string;
  copyright: string;
}

interface SpotifyToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

/**
 * Image Manager for Circles App
 * Handles fetching official movie posters and album covers from various APIs
 */
class ImageManager {
  private tmdbApiKey: string | undefined;
  private spotifyClientId: string | undefined;
  private spotifyClientSecret: string | undefined;
  private omdbApiKey: string | undefined;
  
  private cache: Map<string, ImageData>;
  private spotifyToken: string | null;
  private spotifyTokenExpiry: number | null;

  constructor() {
    // API Keys (stored in environment variables)
    this.tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
    this.spotifyClientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    this.spotifyClientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    this.omdbApiKey = import.meta.env.VITE_OMDB_API_KEY;
    
    // Cache for API responses
    this.cache = new Map();
    this.spotifyToken = null;
    this.spotifyTokenExpiry = null;
  }

  /**
   * Get movie poster from TMDb
   */
  async getMoviePoster(title: string, year: number | null = null, language = 'en'): Promise<ImageData | null> {
    const cacheKey = `movie_${title}_${year}_${language}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) || null;
    }

    try {
      if (!this.tmdbApiKey) {
        console.error('TMDb API key is missing. Add it to your .env file as VITE_TMDB_API_KEY');
        return null;
      }

      const query = year ? `${title} y:${year}` : title;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.tmdbApiKey}&query=${encodeURIComponent(query)}&language=${language}`
      );
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const movie = data.results[0];
        const posterUrl = movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null;
        
        if (!posterUrl) {
          return null;
        }
        
        const result: ImageData = {
          url: posterUrl,
          title: movie.title,
          year: movie.release_date ? new Date(movie.release_date).getFullYear() : undefined,
          tmdbId: movie.id.toString(),
          attribution: 'The Movie Database (TMDb)',
          copyright: '© The Movie Database (TMDb)'
        };
        
        this.cache.set(cacheKey, result);
        return result;
      }
    } catch (error) {
      console.error('TMDb API error:', error);
    }
    
    return null;
  }

  /**
   * Get album cover from Spotify
   */
  async getAlbumCover(artist: string, album: string): Promise<ImageData | null> {
    const cacheKey = `album_${artist}_${album}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) || null;
    }

    try {
      // Get Spotify access token if needed
      await this.ensureSpotifyToken();
      
      if (!this.spotifyToken) {
        console.error('Failed to get Spotify token');
        return null;
      }
      
      const query = `artist:${artist} album:${album}`;
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=1`,
        {
          headers: {
            'Authorization': `Bearer ${this.spotifyToken}`
          }
        }
      );
      
      const data = await response.json();
      
      if (data.albums && data.albums.items.length > 0) {
        const albumData = data.albums.items[0];
        const coverUrl = albumData.images && albumData.images.length > 0 
          ? albumData.images[0].url 
          : null;
        
        if (!coverUrl) {
          return null;
        }
        
        const result: ImageData = {
          url: coverUrl,
          title: albumData.name,
          spotifyId: albumData.id,
          attribution: 'Spotify',
          copyright: '© Spotify AB'
        };
        
        this.cache.set(cacheKey, result);
        return result;
      }
    } catch (error) {
      console.error('Spotify API error:', error);
    }
    
    return null;
  }

  /**
   * Ensure we have a valid Spotify access token
   */
  async ensureSpotifyToken(): Promise<void> {
    if (this.spotifyToken && this.spotifyTokenExpiry && this.spotifyTokenExpiry > Date.now()) {
      return;
    }

    try {
      if (!this.spotifyClientId || !this.spotifyClientSecret) {
        console.error('Spotify credentials missing. Add them to your .env file as VITE_SPOTIFY_CLIENT_ID and VITE_SPOTIFY_CLIENT_SECRET');
        return;
      }

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${this.spotifyClientId}:${this.spotifyClientSecret}`)}`
        },
        body: 'grant_type=client_credentials'
      });
      
      const data: SpotifyToken = await response.json();
      this.spotifyToken = data.access_token;
      this.spotifyTokenExpiry = Date.now() + (data.expires_in * 1000);
    } catch (error) {
      console.error('Spotify token error:', error);
      throw error;
    }
  }

  /**
   * Fallback to OMDb for movie posters
   */
  async getMoviePosterOMDb(title: string, year: number | null = null): Promise<ImageData | null> {
    try {
      if (!this.omdbApiKey) {
        console.error('OMDb API key is missing. Add it to your .env file as VITE_OMDB_API_KEY');
        return null;
      }

      const params = new URLSearchParams({
        apikey: this.omdbApiKey,
        t: title,
        type: 'movie'
      });
      
      if (year) {
        params.append('y', year.toString());
      }
      
      const response = await fetch(`https://www.omdbapi.com/?${params}`);
      const data = await response.json();
      
      if (data.Response === 'True' && data.Poster && data.Poster !== 'N/A') {
        return {
          url: data.Poster,
          title: data.Title,
          year: parseInt(data.Year),
          imdbId: data.imdbID,
          attribution: 'OMDb API',
          copyright: '© OMDb API'
        };
      }
    } catch (error) {
      console.error('OMDb API error:', error);
    }
    
    return null;
  }

  /**
   * Get comprehensive movie data with poster
   */
  async getMovieData(title: string, year: number | null = null, language = 'en'): Promise<ImageData | null> {
    // Try TMDb first (better quality and free)
    let result = await this.getMoviePoster(title, year, language);
    
    // Fallback to OMDb if TMDb fails
    if (!result || !result.url) {
      result = await this.getMoviePosterOMDb(title, year);
    }
    
    return result;
  }

  /**
   * Batch process multiple movies/albums
   */
  async batchProcessImages(items: Array<{
    id: string;
    title: string;
    type: string;
    year?: number;
    artist?: string;
    album?: string;
    language?: string;
    fallbackImage?: string;
  }>): Promise<Array<{
    id: string;
    title: string;
    type: string;
    imageData: ImageData | { url: string };
  }>> {
    const results = [];
    
    for (const item of items) {
      try {
        let imageData: ImageData | null = null;
        
        if (item.type === 'movie' || item.type === 'film' || item.type === 'webseries') {
          imageData = await this.getMovieData(item.title, item.year || null, item.language);
        } else if (item.type === 'music' || item.type === 'album') {
          if (item.artist) {
            imageData = await this.getAlbumCover(item.artist, item.album || item.title);
          }
        }
        
        results.push({
          ...item,
          imageData: imageData || { url: item.fallbackImage || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400' }
        });
        
        // Rate limiting - wait between requests
        await this.delay(100);
        
      } catch (error) {
        console.error(`Error processing ${item.title}:`, error);
        results.push({
          ...item,
          imageData: { url: item.fallbackImage || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400' }
        });
      }
    }
    
    return results;
  }

  /**
   * Process all projects in the application
   */
  async processAllProjects(projects: Project[]): Promise<Project[]> {
    const items = projects.map(project => ({
      id: project.id,
      title: project.title,
      type: project.type,
      year: project.title.match(/\d{4}/) ? parseInt(project.title.match(/\d{4}/)![0]) : undefined,
      artist: project.artist,
      language: project.language,
      fallbackImage: project.poster
    }));

    const results = await this.batchProcessImages(items);
    
    // Map results back to projects
    return projects.map(project => {
      const result = results.find(r => r.id === project.id);
      if (result && result.imageData) {
        return {
          ...project,
          poster: result.imageData.url,
          imageAttribution: (result.imageData as ImageData).attribution,
          imageCopyright: (result.imageData as ImageData).copyright
        };
      }
      return project;
    });
  }

  /**
   * Utility function for delays
   */
  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number, keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

export default ImageManager;
export { type ImageData };