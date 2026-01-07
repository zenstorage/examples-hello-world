Deno.serve(async (req) => {
  const url = new URL(req.url);
  const path = url.pathname;

  if (path === "/") {
    return new Response("Hello, Deno!", {
      headers: { "Content-Type": "text/plain" },
    });
  }

  if (path === "/ip") {
    const ip = await getIP();
    return new Response(ip, {
      headers: { "Content-Type": "text/plain" },
    });
  }

  if (path === "/hw") {
    return new Response("Hello World!", {
      headers: { "Content-Type": "text/plain" },
    });
  }

  if (path === "/debug") {
    const debug = {
      status: "ok",
      method: req.method,
      headers: Object.fromEntries(req.headers),
      url: req.url,
    };

    return new Response(JSON.stringify(debug, null, 2), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const id = path.substring(1);
  const pdURL = `https://pixeldrain.com/api/file/${id}?download`;
  const res = fetch(pdURL);

  return res;
});

async function getIP(): Promise<string> {
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
  return data.ip;
}
