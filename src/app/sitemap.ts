import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://meetprerna-travel.vercel.app',
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
