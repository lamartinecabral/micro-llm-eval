/*
 * The GitHub Pages app is intentionally served without a build step.  This
 * worker makes TypeScript modules look like normal JavaScript modules to the
 * browser before they are evaluated.
 * Top-level import ensures Babel is initialized whenever the worker thread boots
 */
importScripts(
  "https://cdn.jsdelivr.net/npm/@babel/standalone@7.29.7/babel.min.js",
);

self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (
    url.origin !== self.location.origin ||
    !/\.(?:ts|tsx|jsx)$/i.test(url.pathname)
  ) {
    return;
  }

  event.respondWith(transpile(event.request));
});

async function transpile(request) {
  const response = await fetch(request);
  if (!response.ok) return response;

  const source = await response.text();
  const result = self.Babel.transform(source, {
    filename: new URL(request.url).pathname,
    sourceType: "module",
    presets: ["react", "typescript"],
  });

  const headers = new Headers(response.headers);
  headers.set("content-type", "text/javascript; charset=utf-8");
  // The fetched body has already been decoded by fetch; forwarding these
  // metadata headers would describe the original TypeScript response.
  headers.delete("content-encoding");
  headers.delete("content-length");

  return new Response(result.code, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
