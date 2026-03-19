export interface Student {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  skills: string[];
  interests: string[];
  contact?: string;
  major?: string;
}

export type View = 'explore' | 'profile' | 'edit-profile';