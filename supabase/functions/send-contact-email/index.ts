import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { name, email, subject, message, attachmentUrl, attachmentName } = await req.json();

        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields: name, email, message' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const resendApiKey = Deno.env.get('RESEND_API_KEY');
        const toEmail = Deno.env.get('TO_EMAIL') || 'hadilalduleimi2@gmail.com';

        if (!resendApiKey) {
            return new Response(
                JSON.stringify({ error: 'Server misconfiguration: missing RESEND_API_KEY' }),
                { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const attachmentSection = attachmentUrl
            ? `<p style="margin:24px 0 0;padding:16px;background:#f5f5f5;border-left:3px solid #111;font-family:monospace;font-size:13px;">
                 <strong>Attachment:</strong> ${attachmentName}<br/>
                 <a href="${attachmentUrl}" style="color:#111;word-break:break-all;">${attachmentUrl}</a>
               </p>`
            : '';

        const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:3px solid #111;max-width:600px;width:100%;">
        <tr>
          <td style="background:#111;padding:24px 32px;">
            <p style="margin:0;font-family:monospace;font-size:10px;color:#888;letter-spacing:0.2em;text-transform:uppercase;">
              HADIL AL-DULEIMI — PORTFOLIO
            </p>
            <p style="margin:8px 0 0;font-family:sans-serif;font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.01em;text-transform:uppercase;">
              New Contact Message
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:0 0 16px;">
                  <p style="margin:0 0 4px;font-family:monospace;font-size:10px;color:#999;letter-spacing:0.15em;text-transform:uppercase;">From</p>
                  <p style="margin:0;font-family:sans-serif;font-size:15px;color:#111;font-weight:600;">${name}</p>
                  <p style="margin:2px 0 0;font-family:monospace;font-size:13px;color:#555;">${email}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 0;border-top:1px solid #eee;">
                  <p style="margin:0 0 4px;font-family:monospace;font-size:10px;color:#999;letter-spacing:0.15em;text-transform:uppercase;">Subject</p>
                  <p style="margin:0;font-family:sans-serif;font-size:15px;color:#111;">${subject || 'Portfolio Enquiry'}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 0;border-top:1px solid #eee;">
                  <p style="margin:0 0 12px;font-family:monospace;font-size:10px;color:#999;letter-spacing:0.15em;text-transform:uppercase;">Message</p>
                  <p style="margin:0;font-family:sans-serif;font-size:15px;color:#333;line-height:1.7;white-space:pre-wrap;">${message}</p>
                </td>
              </tr>
            </table>
            ${attachmentSection}
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;border-top:1px solid #eee;background:#fafafa;">
            <p style="margin:0;font-family:monospace;font-size:11px;color:#aaa;">
              Sent via hadilalduleimi.com contact form
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

        const plainText = `New contact message from ${name} <${email}>\n\nSubject: ${subject || 'Portfolio Enquiry'}\n\n${message}${attachmentUrl ? `\n\nAttachment: ${attachmentName}\n${attachmentUrl}` : ''}`;

        const resendPayload: Record<string, unknown> = {
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [toEmail],
            reply_to: email,
            subject: `[Portfolio] ${subject || 'New Enquiry'} — ${name}`,
            html: htmlBody,
            text: plainText,
        };

        const resendRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resendPayload),
        });

        if (!resendRes.ok) {
            const err = await resendRes.text();
            console.error('Resend error:', err);
            return new Response(
                JSON.stringify({ error: 'Failed to send email. Please try again.' }),
                { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (err) {
        console.error('Unexpected error:', err);
        return new Response(
            JSON.stringify({ error: 'Unexpected error. Please try again.' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
