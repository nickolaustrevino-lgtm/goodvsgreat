const VIDEO_SOURCE_PATTERN = /^(?:\/manus-storage\/|https?:\/\/).+\.(mp4|webm|ogg)(?:[?#].*)?$/i;

export function normalizeVideoSource(value: string): string | null {
  const source = value.trim();
  return VIDEO_SOURCE_PATTERN.test(source) ? source : null;
}

export function getVideoMimeType(source: string): "video/mp4" | "video/webm" | "video/ogg" {
  const pathname = source.split(/[?#]/, 1)[0].toLowerCase();
  if (pathname.endsWith(".webm")) return "video/webm";
  if (pathname.endsWith(".ogg")) return "video/ogg";
  return "video/mp4";
}
