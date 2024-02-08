export default <ExportedHandler<{ PASSWORD: string }>>{
  async fetch(request, env) {
    console.log(request, env);
    const url = new URL(request.url);

    const testToken = 'prototype-token-value';
    const data = [{
      name: "hello world",
      url: "https://recommend-me.alkuramshina.workers.dev/"
    }];

    switch (url.pathname) {
      case "/":
        return new Response(`/links for unauthorized endpoint; \n/links/auth for basic authorization (token: ${testToken})`);

      case "/links":
        return Response.json(data);

      case "/links/auth": {
        const authorization = request.headers.get("Authorization");
        if (!authorization) {
          return new Response("You need to authorize.", {
            status: 401,
            headers: {
              // Prompts the user for credentials.
              "WWW-Authenticate": 'Basic realm="my scope", charset="UTF-8"',
            },
          });
        }
        const [scheme, token] = authorization.split(" ");

        // The Authorization header must start with Basic, followed by a space.
        if (!token || scheme !== "Basic") {
          return new Response("Malformed authorization header.", {
            status: 400,
          });
        }

        // Just a mock for Authorization
        if (token !== testToken) {
          return new Response("Unauthorized.", {
            status: 401,
          });
        }

        return Response.json(data, {
          status: 200,
          headers: {
            "Cache-Control": "no-store",
          },
        });
      }
    }

    return new Response("Not Found.", { status: 404 });
  },
};
