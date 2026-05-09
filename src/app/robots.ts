export default function robots() {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://eoricart.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/checkout',
          '/cart',
          '/auth',
          '/update-password',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
