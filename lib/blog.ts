import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { cache } from "react";

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  content: string;
  faqs: BlogFaq[];
};

const blogDirectory = path.join(process.cwd(), "content/blog");

function readFaqs(value: unknown): BlogFaq[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const question = "question" in item ? String(item.question).trim() : "";
    const answer = "answer" in item ? String(item.answer).trim() : "";
    if (!question || !answer) return [];
    return [{ question, answer }];
  });
}

function readDate(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  const text = String(value ?? "").trim();
  return text.slice(0, 10);
}

function readPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) return [];

  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(blogDirectory, file), "utf8");
      const { data, content } = matter(raw);
      const date = readDate(data.date);
      const updated = data.updated ? readDate(data.updated) : date;

      return {
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title ?? "Untitled"),
        description: String(data.description ?? ""),
        date,
        updated,
        content,
        faqs: readFaqs(data.faqs),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const getPosts = cache(readPosts);

export const getPost = cache((slug: string) => getPosts().find((post) => post.slug === slug));

export function relatedPosts(slug: string, count = 2) {
  return getPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, count);
}

export function formatPostDate(iso: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Pacific/Auckland",
  }).format(new Date(`${iso}T12:00:00+12:00`));
}
