import { error } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

const STRAPI_URL = env.STRAPI_INTERNAL_URL ?? "http://strapi:1337";

export async function load({ params, fetch }) {
  const catRes = await fetch(
    `${STRAPI_URL}/api/categories?filters[slug][$eq]=${params.slug}&populate=background`,
  );
  const catJson = await catRes.json();

  if (!catJson.data || catJson.data.length === 0) {
    throw error(404, "Category not found");
  }

  const category = catJson.data[0];

  const articlesRes = await fetch(
    `${STRAPI_URL}/api/articles?filters[category][slug][$eq]=${params.slug}&sort=publishedAt:desc`,
  );
  const articlesJson = await articlesRes.json();

  return {
    category,
    articles: articlesJson.data ?? [],
  };
}
