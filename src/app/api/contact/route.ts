import { Resend } from "resend";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  country: z.string().min(1),
  phone: z.string().min(6),
  email: z.string().email(),
  interest: z.string().optional(),
  message: z.string().min(20),
  locale: z.string().optional(),
});

function buildEmailBody(
  data: z.infer<typeof bodySchema>,
  lines: string[],
) {
  lines.push(`Name: ${data.name}`);
  if (data.company) lines.push(`Company: ${data.company}`);
  lines.push(`Country: ${data.country}`);
  lines.push(`Phone: ${data.phone}`);
  lines.push(`Email: ${data.email}`);
  if (data.interest) lines.push(`Interest: ${data.interest}`);
  if (data.locale) lines.push(`Locale: ${data.locale}`);
  lines.push("");
  lines.push(data.message);
  return lines.join("\n");
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const data = parsed.data;
  const text = buildEmailBody(data, []);

  const to = process.env.CONTACT_TO_EMAIL || "Info@pernoscal.com";
  const from = process.env.RESEND_FROM_EMAIL;

  if (process.env.RESEND_API_KEY && from) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `[Pernoscal] ${data.name}`,
      text,
    });
    if (error) {
      console.error("[contact] Resend error", error);
      return Response.json({ ok: false }, { status: 502 });
    }
  } else {
    console.info("[contact] (no RESEND_API_KEY or RESEND_FROM_EMAIL)\n", text);
  }

  return Response.json({ ok: true });
}
