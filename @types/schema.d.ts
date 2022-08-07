export type Tag = {
  color: string;
  id: string;
  name: string;
};

export type BlogPost = {
  id: string;
  cover: string;
  title: string;
  tags: Tag[];
  description: string;
  date: string;
  content: string;
};
