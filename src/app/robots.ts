import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart', '/login'],
    },
    sitemap: 'https://aurastore-dashboard.example.com/sitemap.xml',
  };
}
