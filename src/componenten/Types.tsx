export type ResponseCheck = {
  checkedAt: string;
  responseTimeMs: number | null;
};

export type ServerResponse = {
  id: string;
  name: string;
  url: string;
  checks: ResponseCheck[];
};
