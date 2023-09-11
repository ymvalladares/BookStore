namespace WebApplication1.Middleware
{
    public static class MiddlewareHeader
    {
        public static void AddPaginationHeaders(this HttpResponse Response)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Headers.Add("Access-Control-Allow-Headers", "*");
            Response.Headers.Add("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, PATCH, DELETE");
            Response.Headers.Add("Access-Control-Expose-Headers", "Content-Length, X-JSON");
        }
    }
}
