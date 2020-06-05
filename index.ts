import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();
const port = 8800;

const throwError = ({ params, response }: { params: { code: string }; response: any }, ) => {
    const code = +params.code;
    switch (code) {
        case 400:
        case 401:
        case 404:
        case 404:
        case 500:
        case 502:
        case 503:
        case 504:
            response.status = code;
            response.body = {
                success: false,
                data: null
            }
            break;
        default:
            response.status = 400;
            response.body = {
                success: false,
                data: null
            }
    }
};

router.get('/', ({response}) => {
    response.status = 200;
    response.body = "Hello";
});

router.get('/api/errors/:code', throwError);

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port ${port}`);
await app.listen({ port });

// deno run --allow-net --allow-read index.ts