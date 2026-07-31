import { env } from "$env/dynamic/private";

const STRAPI_URL = env.STRAPI_INTERNAL_URL ?? "http://strapi:1337";

export async function load({ fetch }) {
  const [catRes, artRes] = await Promise.all([
    fetch(`${STRAPI_URL}/api/categories?populate=image&sort=order:asc`),
    fetch(
      `${STRAPI_URL}/api/articles?populate=category&sort=publishedAt:desc&pagination[limit]=6`,
    ),
  ]);

  const categories = catRes.ok ? (await catRes.json()).data : [];
  const articles = artRes.ok ? (await artRes.json()).data : [];

  return { categories, articles };
}
