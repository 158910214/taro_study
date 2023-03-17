import { Configuration, OpenAIApi } from "openai";
import Koa from "koa";
import Router from "koa-router";

// https://platform.openai.com/docs/api-reference/images

const configuration = new Configuration({
  organization: "",
  apiKey: "",
});
const openai = new OpenAIApi(configuration);

const app = new Koa();
const router = new Router();

router.get("/chat", async (ctx) => {
  // 获取请求中的参数
  const { prompt } = ctx.request.query;
  console.log("chat get", ctx.request.query, prompt);

  const res = await openai.createCompletion({
    // 对话模型
    model: "text-davinci-003", //  dialogue-babi-001 对话模型
    // messages: [{ role: "user", content: prompt }],
    prompt: prompt,
    max_tokens: 2048
  });
  // 将生成的内容返回给客户端
  console.log(res.data.choices[0])
  ctx.body = res.data.choices[0].text;
  // ctx.body = res.data.choices[0].messages;
});

router.get("/image", async (ctx) => {
  // 获取请求中的参数
  console.log("image get", ctx.request.query);
  const { prompt } = ctx.request.query;
  const res = await openai.createImage({
    prompt: prompt,
    size: "1900x950",
    n: 2,
  });
  // 将生成的内容返回给客户端
  var url = res.data.data[0].url;

  ctx.body = '<img src="' + url + '"></>';
});

// 启用路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
app.listen(8088, '0.0.0.0', () => {
  console.log("Server is listening on port " + 8088);
});
