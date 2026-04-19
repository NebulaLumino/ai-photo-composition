import { NextRequest, NextResponse } from 'next/server';
let _client: any = null;
async function getClient() {
  if (!_client) {
    const { default: OpenAI } = await import('openai');
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: 'https://api.deepseek.com/v1' });
  }
  return _client;
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await getClient();
    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: 'You are an expert photography composition coach. Analyze the provided photo description and give detailed composition feedback. Include: rule of thirds analysis, golden ratio/spiral notes, leading lines detection, horizon/tilt assessment, subject balance evaluation, and specific improvement suggestions with crop recommendations.\n\nData: ' + JSON.stringify(body) }],
    });
    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch(err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
