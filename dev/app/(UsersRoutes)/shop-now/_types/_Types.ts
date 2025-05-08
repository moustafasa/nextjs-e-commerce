export type ShopNowSearchParams = {
  searchParams: Promise<{
    category?: string | string[];
    page?: string;
    search?: string;
  }>;
};
