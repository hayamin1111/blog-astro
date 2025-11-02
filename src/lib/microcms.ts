/**
 * microCMSヘルパー
 *
 * 説明:
 * - microCMS の REST API から記事データを取得するユーティリティ関数
 * - 環境変数 MICROCMS_API_KEY, MICROCMS_SERVICE_DOMAIN を使用
 * - APIキーはクライアントに公開しないよう、サーバーサイド（AstroのfrontmatterやAPI route）で呼び出すこと
 *
 * 使用例（Astro frontmatter）:
 * const posts = await getPosts();
 *
 * 注意:
 * - 環境変数を変更した場合は dev サーバーを再起動する
 * - slug 等のクエリは encodeURIComponent でエンコードしている
 */
const API_KEY = import.meta.env.MICROCMS_API_KEY
const SERVICE_DOMAIN = import.meta.env.MICROCMS_SERVICE_DOMAIN

export type Post = {
  id: string
  title: string
  slug: string
  body: string
  publishedAt?: string
  eyecatch?: { url: string }
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(
    `https://${SERVICE_DOMAIN}.microcms.io/api/v1/posts`,
    {
      headers: { 'X-MICROCMS-API-KEY': API_KEY },
    }
  )
  const data = await res.json()
  return data.contents
}

export async function getPost(slug: string): Promise<Post> {
  const res = await fetch(
    `https://${SERVICE_DOMAIN}.microcms.io/api/v1/posts?filters=slug[equals]${slug}`,
    {
      headers: { 'X-MICROCMS-API-KEY': API_KEY },
    }
  )
  const data = await res.json()
  return data.contents[0]
}
