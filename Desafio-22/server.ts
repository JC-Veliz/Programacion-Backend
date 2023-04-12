import { Handlebars } from "https://deno.land/x/handlebars/mod.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

//ROUTER
const router = new Router();

// HB
const hb = new Handlebars();
const PORT = 8080;

const colores: string[] = []; // RECORDAR QUE

router.get("/", async (ctx) => {
  const template = await hb.renderView("index");
  ctx.response.headers.set("content-type", "text/html");
  ctx.response.body = template;
});

router.post("/colores", async (ctx) => {
  const body = await ctx.request.body().value;
  if(body.color) colores.push(body.color)
  ctx.response.status = 200;
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = colores;
});

router.get("/colores",  (ctx) => {
  ctx.response.status = 200;
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = colores;
});

app.use(router.allowedMethods());

app.use(router.routes());

console.log(`Escuchando en ${PORT}`);

await app.listen({ port: PORT, hostname: "127.0.0.1" });
