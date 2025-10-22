export async function POST(req) {
  const { message } = await req.json();

  const reply = `"${message}"`;

  return new Response(JSON.stringify({ reply }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
