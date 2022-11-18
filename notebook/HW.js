import {Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'

// 范例①：假设行程
const posts = [
    {id:0, title:'First schedule', datatime:'2020-04-04T20:30', body:'Flight XXXX is on time with China Southern Airlines'},
    {id:1, title:'Second schedule', datatime:'2020-04-05T00:00', body:'Arrive at Wuhan Airport, pick up luggage, go to hotel'}
];

const router = new Router();

router.get('/',list )
    .get('/post/new', add)
    .get('/post/:id', show)
    .post('/post', create);  

    const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

async function list(ctx) {
    ctx.response.body = await render.list(posts);
}

async function add(ctx) {
    ctx.response.body = await render.newPost();
}

async function show(ctx) {
    const id = ctx.params.id;
    const post = posts[id];
    if (!post) ctx.throw(404, 'invalid post id');
    ctx.response.body = await render.show(post);
  }
  
  async function create(ctx) {
    const body = ctx.request.body()
    if (body.type === "form") {
      const pairs = await body.value
      const post = {}
      for (const [key, value] of pairs) {
        post[key] = value
      }
      console.log('post=', post)
      const id = posts.push(post) - 1;
      post.created_at = new Date();
      post.id = id;
      ctx.response.redirect('/');
    }
  }
  

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });