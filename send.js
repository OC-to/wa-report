export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, nomor, message } = req.body;

  if (!token || !nomor || !message) {
    return res.status(400).json({ error: 'token, nomor, message wajib diisi' });
  }

  try {
    const resp = await fetch('https://fontee.id/api/send', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        target: nomor,
        message: message,
        countryCode: '62'
      })
    });

    const data = await resp.json();

    if (!resp.ok || data.status === false) {
      return res.status(400).json({
        error: data.message || data.error || 'Fonnte error',
        raw: data
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
