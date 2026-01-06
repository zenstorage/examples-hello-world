import { serveFile } from "jsr:@std/http/file-server";

Deno.serve((req: Request) => {
    const res = fetch("https://checkip.amazonaws.com/");

    return res;

    // return serveFile(req, "./index.html");
});