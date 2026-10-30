export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();

  return function consume(key: string) {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= max) return false;
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 1000) {
      for (const [k, times] of hits) if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
    return true;
  };
}

export function clientIp(request: Request) {
  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real;
  return request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() || "unknown";
}

export function anonymizeIp(ip: string) {
  if (ip.includes(":")) return ip.split(":").slice(0, 3).join(":") + "::";
  const parts = ip.split(".");
  return parts.length === 4 ? parts.slice(0, 3).join(".") + ".0" : "unknown";
}
