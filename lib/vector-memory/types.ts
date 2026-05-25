export type VectorMemoryRecord = {
  id: string;
  title: string;
  source: string;
  module: string;
  content: string;
  tokens: string[];
  createdAt: string;
};

export type VectorSearchResult = VectorMemoryRecord & {
  score: number;
};
