export interface Session {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}
