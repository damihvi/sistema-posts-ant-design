export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  status: 'draft' | 'published' | 'archived';
}

export interface PostFormData {
  title: string;
  content: string;
  author: string;
  tags?: string[];
  status: 'draft' | 'published';
}

export interface PostStats {
  total: number;
  published: number;
  drafts: number;
  archived: number;
  totalViews?: number;
  averageLength: number;
  mostPopularTags: { tag: string; count: number }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
