export interface Session {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface Post {
  author: Author;
  id: string;
  title: string;
  desc: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  image: string;
}
