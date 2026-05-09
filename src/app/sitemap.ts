const BASE_URL = process.env.NEXTAUTH_URL || 'https://eoricart.com';

async function fetchProducts(): Promise<{ item_code: string; modified?: string }[]> {
  try {
    const apiKey = process.env.ERPNEXT_API_KEY;
    const apiSecret = process.env.ERPNEXT_API_SECRET;
    const erpUrl = process.env.ERPNEXT_URL;

    if (!apiKey || !apiSecret || !erpUrl) return [];

    const params = new URLSearchParams({
      fields: '["item_code","modified"]',
      filters: '[["show_in_website","=",1],["disabled","=",0]]',
      limit_page_length: '500',
    });

    const res = await fetch(`${erpUrl}/api/resource/Item?${params.toString()}`, {
      headers: { Authorization: `token ${apiKey}:${apiSecret}` },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const products = await fetchProducts();

  const staticRoutes = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const productRoutes = products.map((p) => ({
    url: `${BASE_URL}/products/${encodeURIComponent(p.item_code)}`,
    lastModified: p.modified ? new Date(p.modified) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
