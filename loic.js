import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

function page(body) {
  return `<html>
  <head>
  <style>
    body{
        background-color: #6495ed;
}
    h1{
        color: #e0ffff;
        text-align:center;
}
  </style>
  </head>
  <body>
  ${body}
  </body>
  </html>`
}

app.use((ctx) => {
    console.log('ctx.request.url=', ctx.request.url)
    let pathname = ctx.request.url.pathname
    if (pathname.startsWith("/login")){
        ctx.response.body = page(`
            <h1>LOGIN</h1>
            <form action="" method="post">
                <input type="text" name="user" value="" placeholder="User Name"/>
                <input type="password" name="password" value="" placeholder="Password"/>
                <input type="button" name="submit" value="Submit"/>
            </form>
        `)
    }
    else{
        ctx.response.body = page(`
            <h1>HOME</h1>
            <a href="http://127.0.0.1:8000/login">LOGIN</a>
        `)
    }
  // searchParams.get('name')=${ctx.request.url.searchParams.get('name')}
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });


