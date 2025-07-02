import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Post, PostFormData, PostStats } from '../types';

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  stats: PostStats | null;
}

type PostAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'UPDATE_POST'; payload: Post }
  | { type: 'DELETE_POST'; payload: string }
  | { type: 'SET_STATS'; payload: PostStats };

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  stats: null,
};

const PostContext = createContext<{
  state: PostState;
  dispatch: React.Dispatch<PostAction>;
  actions: {
    createPost: (postData: PostFormData) => Promise<void>;
    updatePost: (id: string, postData: Partial<PostFormData>) => Promise<void>;
    deletePost: (id: string) => Promise<void>;
    fetchPosts: () => Promise<void>;
    fetchStats: () => Promise<void>;
  };
} | null>(null);

function postReducer(state: PostState, action: PostAction): PostState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_POSTS':
      return { ...state, posts: action.payload, loading: false };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    default:
      return state;
  }
}

export function PostProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(postReducer, initialState);

  // Simulamos datos de posts para el demo
  const mockPosts: Post[] = [
    {
      id: '1',
      title: 'Bienvenido al Sistema de Posts',
      content: 'Este es el primer post de ejemplo en nuestro sistema. Aquí puedes escribir todo el contenido que desees.',
      author: 'Admin',
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-01'),
      tags: ['bienvenida', 'sistema'],
      status: 'published',
    },
    {
      id: '2',
      title: 'Guía de Uso',
      content: 'En esta guía te explicamos cómo usar todas las funcionalidades del sistema de posts.',
      author: 'Moderador',
      createdAt: new Date('2025-01-02'),
      updatedAt: new Date('2025-01-02'),
      tags: ['guía', 'tutorial'],
      status: 'published',
    },
  ];

  const actions = {
    createPost: async (postData: PostFormData) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // Simulamos una llamada a la API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newPost: Post = {
          id: Date.now().toString(),
          ...postData,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        dispatch({ type: 'ADD_POST', payload: newPost });
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Error al crear el post' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    updatePost: async (id: string, postData: Partial<PostFormData>) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const existingPost = state.posts.find(post => post.id === id);
        if (existingPost) {
          const updatedPost: Post = {
            ...existingPost,
            ...postData,
            updatedAt: new Date(),
          };
          dispatch({ type: 'UPDATE_POST', payload: updatedPost });
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Error al actualizar el post' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    deletePost: async (id: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        dispatch({ type: 'DELETE_POST', payload: id });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Error al eliminar el post' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    fetchPosts: async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch({ type: 'SET_POSTS', payload: mockPosts });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Error al cargar los posts' });
      }
    },

    fetchStats: async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const posts = state.posts.length > 0 ? state.posts : mockPosts;
        const stats: PostStats = {
          total: posts.length,
          published: posts.filter(p => p.status === 'published').length,
          drafts: posts.filter(p => p.status === 'draft').length,
          archived: posts.filter(p => p.status === 'archived').length,
          averageLength: posts.reduce((sum, p) => sum + p.content.length, 0) / posts.length,
          mostPopularTags: calculatePopularTags(posts),
        };
        
        dispatch({ type: 'SET_STATS', payload: stats });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Error al cargar las estadísticas' });
      }
    },
  };

  return (
    <PostContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </PostContext.Provider>
  );
}

function calculatePopularTags(posts: Post[]) {
  const tagCount: { [key: string]: number } = {};
  
  posts.forEach(post => {
    post.tags?.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

export function usePost() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
}
