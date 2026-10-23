import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS — អនុញ្ញាតឲ្យ frontend ហៅ API បាន
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
  }),
);
app.use(express.json({ limit: "10kb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "portfolio-contact-api" });
});

// Contact endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body || {};

  // Validation នៅ server (មិនអាចទុកចិត្ត frontend បានទេ)
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "សូមបំពេញគ្រប់ field" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Email មិនត្រឹមត្រូវ" });
  }
  if (message.trim().length > 4000) {
    return res.status(400).json({ error: "សារវែងពេក" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("❌ Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return res.status(500).json({ error: "Server មិនបានកំណត់ត្រឹមត្រូវ" });
  }

  // Escape MarkdownV2 special chars
  const escapeMd = (str) =>
    String(str).replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");

  const text =
    `📬 *New Portfolio Message*\n\n` +
    `👤 *Name:* ${escapeMd(name)}\n` +
    `📧 *Email:* ${escapeMd(email)}\n\n` +
    `💬 *Message:*\n${escapeMd(message)}\n\n` +
    `🕒 ${new Date().toLocaleString("en-US", { timeZone: "Asia/Phnom_Penh" })}`;

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "MarkdownV2",
      }),
    });

    if (!tg.ok) {
      const errBody = await tg.text();
      console.error("❌ Telegram API error:", errBody);
      return res.status(502).json({ error: "ផ្ញើទៅ Telegram បរាជ័យ" });
    }

    console.log(`✅ Message from ${email} delivered to Telegram`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return res.status(500).json({ error: "មានបញ្ហាក្នុង server" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
