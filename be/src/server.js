import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import cors from "cors";
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = process.env.PORT || 3001;
const host = process.env.HOST || "0.0.0.0";
const prisma = new PrismaClient();
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const generateModel =
  process.env.CLAUDE_GENERATE_MODEL || "claude-sonnet-4-20250514";
const refineModel =
  process.env.CLAUDE_REFINE_MODEL || "claude-3-5-haiku-20241022";
const masterPrompt =
  process.env.MASTER_PROMPT ||
  "You build installable mobile-first PWA prototypes. Return one complete HTML document only, with inline CSS and JavaScript. Do not include markdown fences or explanation.";

app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/generate", async (req, res, next) => {
  try {
    const prompt = parseRequiredString(req.body.prompt);
    if (!prompt) {
      return res.status(400).json({ error: "prompt is required" });
    }

    const html = await callClaude({
      model: generateModel,
      system: masterPrompt,
      messages: [
        {
          role: "user",
          content: `Build this as a single-file mobile-first PWA HTML document:\n\n${prompt}`,
        },
      ],
    });

    const session = await prisma.session.create({
      data: {
        prompt,
        html,
      },
    });

    res.status(201).json({
      sessionId: session.id,
      html: session.html,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/refine", async (req, res, next) => {
  try {
    const sessionId = parseRequiredString(req.body.sessionId);
    const change = parseRequiredString(req.body.change);

    if (!sessionId) {
      return res.status(400).json({ error: "sessionId is required" });
    }

    if (!change) {
      return res.status(400).json({ error: "change is required" });
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return res.status(404).json({ error: "session not found" });
    }

    const html = await callClaude({
      model: refineModel,
      system: masterPrompt,
      messages: [
        {
          role: "user",
          content: [
            "Update this single-file HTML app using the requested change.",
            "Return the complete updated HTML document only.",
            "",
            `Requested change:\n${change}`,
            "",
            `Current HTML:\n${session.html}`,
          ].join("\n"),
        },
      ],
    });

    const updatedSession = await prisma.session.update({
      where: { id: sessionId },
      data: { html },
    });

    res.json({ html: updatedSession.html });
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);

  if (error.status) {
    return res.status(error.status).json({ error: error.message });
  }

  res.status(500).json({ error: "internal server error" });
});

const server = app.listen(port, host, () => {
  console.log(`API listening on http://${host}:${port}`);
});

server.on("error", (error) => {
  console.error("API failed to start:", error);
  process.exit(1);
});

function parseRequiredString(value) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
}

async function callClaude({ model, system, messages }) {
  if (!process.env.ANTHROPIC_API_KEY) {
    const error = new Error("ANTHROPIC_API_KEY is required");
    error.status = 500;
    throw error;
  }

  const response = await anthropic.messages.create({
    model,
    max_tokens: 8192,
    system,
    messages,
  });

  const text = response.content
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("")
    .trim();

  return stripMarkdownFence(text);
}

function stripMarkdownFence(value) {
  const match = value.match(/^```(?:html)?\s*([\s\S]*?)\s*```$/i);
  return match ? match[1].trim() : value;
}
