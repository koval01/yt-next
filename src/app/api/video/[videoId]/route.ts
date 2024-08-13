export async function GET(
    request: Request,
    { params }: { params: { videoId: string } }
): Promise<Response> {
    try {
        const apiHost = process.env.DLP_API_HOST;
        const apiSecret = process.env.DLP_API_SECRET;

        if (!apiHost || !apiSecret) {
            throw new Error("API host or secret not configured properly.");
        }

        const apiResponse = await fetch(`https://${apiHost}/v1/video/${params.videoId}`, {
            next: { revalidate: 300 },
            headers: {
                'x-secret': apiSecret,
                'x-client-host': request.headers.get('X-Forwarded-For') || ""
            },
        });

        if (!apiResponse.ok) {
            throw new Error(`Failed to fetch video data: ${apiResponse.statusText}`);
        }

        const data = await apiResponse.json();

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
