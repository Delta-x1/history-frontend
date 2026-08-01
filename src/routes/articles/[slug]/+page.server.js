import { error } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

const STRAPI_URL = env.STRAPI_INTERNAL_URL ?? "http://strapi:1337";

export async function load({ params, fetch }) {
  const res = await fetch(
    `${STRAPI_URL}/api/articles?filters[slug][$eq]=${params.slug}&populate=category, image`,
  );

  if (!res.ok) {
    throw error(500, "Failed to fetch article");
  }

  const json = await res.json();

  if (!json.data || json.data.length === 0) {
    throw error(404, "Article not found");
  }

  return {
    article: json.data[0],
  };
}
