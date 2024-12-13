
export async function GET() {
  // Fetch your dynamic routes, e.g., blog posts or pages
  const dynamicRoutes = [
    { url: '/signup', lastModified: '2024-12-12' },
    { url: '/login', lastModified: '2024-12-12' },
  ];

  // Base URL of your website
  const baseUrl = 'https://www.uploadlink.xyz';

  // Generate the XML for the sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${dynamicRoutes
      .map(
        (route) => `
      <url>
        <loc>${baseUrl}${route.url}</loc>
        <lastmod>${route.lastModified}</lastmod>
      </url>
    `
      )
      .join('')}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
