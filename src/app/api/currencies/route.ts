import options from "~/lib/currencies.json";


export function GET() {
    return Response.json(options)
}
