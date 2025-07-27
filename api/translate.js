export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const API_KEY = process.env.TRANSLATOR_API_KEY;
    const API_REGION = process.env.TRANSLATOR_API_REGION || 'uksouth';

    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await fetch(
      'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=ur&to=en',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': API_KEY,
          'Ocp-Apim-Subscription-Region': API_REGION
        },
        body: JSON.stringify([{ text: text }])
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    res.status(200).json({
      translation: data[0]?.translations[0]?.text || 'Translation not found'
    });

  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
}