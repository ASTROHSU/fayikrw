module.exports = async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  res.setHeader('Cache-Control', 'no-store');

  if (!supabaseUrl || !supabaseAnonKey) {
    res.status(200).json({
      configured: false,
      tableReadable: false,
      message: 'Missing SUPABASE_URL or SUPABASE_ANON_KEY in Vercel environment variables.'
    });
    return;
  }

  try {
    const response = await fetch(
      `${supabaseUrl.replace(/\/$/, '')}/rest/v1/fayikrw_entries?select=id&limit=1`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`
        }
      }
    );
    const text = await response.text();
    let body = null;
    try {
      body = text ? JSON.parse(text) : null;
    } catch (error) {
      body = { raw: text.slice(0, 300) };
    }

    res.status(200).json({
      configured: true,
      tableReadable: response.ok,
      status: response.status,
      code: body && body.code,
      message: body && body.message,
      hint: response.ok
        ? 'Supabase connection works.'
        : 'Run supabase-schema.sql in Supabase SQL Editor and confirm RLS policies are enabled.'
    });
  } catch (error) {
    res.status(200).json({
      configured: true,
      tableReadable: false,
      message: error.message || 'Unable to reach Supabase.'
    });
  }
};
