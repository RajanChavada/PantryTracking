import OpenAI from 'openai';

export async function POST(req: Request) {
  const reqBody = await req.json();
  const prompt = reqBody.data.prompt;

  const openai = new OpenAI({
    apiKey: APIKEY,
    baseURL: 'https://api.groq.com/openai/v1',
  });

  console.log('OpenAI initialized with baseURL:', openai.baseURL, openai.apiKey);

  
  try {
    const completion = await openai.chat.completions.create({
      model: 'mixtral-8x7b-32768', // Using a different model
      messages: [{ role: 'user', content: prompt }],
    });
    const generatedText = completion.choices[0].message.content;

    return new Response(JSON.stringify({ text: generatedText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Detailed error:', JSON.stringify(error, null, 2));
    return new Response(JSON.stringify({ error: 'An error occurred', details: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
