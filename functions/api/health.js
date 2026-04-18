export function onRequestGet() {
  return Response.json({
    ok: true,
    service: "tiny-tamagotchi-mvp",
    runtime: "cloudflare-pages-functions",
    message: "Mochi is awake at the edge."
  });
}

