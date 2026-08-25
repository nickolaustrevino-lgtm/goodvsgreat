export function calculateReadingTime(html: string, wordsPerMinute = 200): string {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / wordsPerMinute))} min read`;
}

export function calculateReadingProgress(scrollY: number, scrollableHeight: number): number {
  if (scrollableHeight <= 0) return 0;
  return Math.min(1, Math.max(0, scrollY / scrollableHeight));
}
