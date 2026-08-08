export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await request.json().catch(() => ({}))
    : Object.fromEntries((await request.formData()).entries());
  console.info("ABA PayWay sandbox callback received", {
    tran_id: (payload as Record<string, unknown>).tran_id,
    status: (payload as Record<string, unknown>).status,
  });
  return Response.json({ok: true});
}

