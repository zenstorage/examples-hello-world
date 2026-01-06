Deno.serve(async (req) => {
  const url = new URL(req.url);
  const path = url.pathname;

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

  return new Response("Not Found", {
    status: 404,
    headers: { "Content-Type": "text/plain" },
  });
});

async function getIP(): Promise<string> {
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
  return data.ip;
}
