import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize the Google Gen AI SDK on the server side safely
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("GEMINI_API_KEY env variable is missing; AI features will fallback to client-side procedural lore.");
  }
} catch (error) {
  console.error("Failed to initialize Google GenAI SDK:", error);
}

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Analyze single Pokemon to generate customized Aetheric/Celestial Lore
app.post("/api/gemini/analyze", async (req, res) => {
  const { name, id, types, stats } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Pokemon name is required" });
  }

  // Fallback procedural lore if Gemini API is not available
  const getFallbackLore = () => {
    const formattedTypes = types ? types.join(" & ") : "Unknown";
    const freq = (100 + (id || 1) * 37.3) % 900 + 100;
    const resonance = (70 + (stats?.reduce((acc: number, curr: any) => acc + (curr.value || 0), 0) || 300) * 0.05) % 30 + 70;
    return {
      originEpoch: `Epoch Delta-${(id || 1) * 7} (Ancient Timeline)`,
      celestialConcordance: `When the cosmic gates align with ${name}, a burst of ${formattedTypes} energy ripples across the celestial fabrics. Legend says this entity commands the core structures of reality.`,
      aethericFrequency: `${freq.toFixed(1)} Hz`,
      resonanceRating: `${resonance.toFixed(1)}%`,
      quantumResonators: [
        { name: "Sovereign Aura", description: "Projects a high-frequency field that pacifies local chronal distortions." },
        { name: "Aetherial Synthesis", description: `Harnesses pure ${formattedTypes} energy to transmute spatial coordinates.` }
      ],
      divineTier: id > 400 ? "Cosmic Archon" : "Primal Relic"
    };
  };

  if (!ai) {
    return res.json(getFallbackLore());
  }

  try {
    const prompt = `Perform an Ethereal High-Tech "Aetheric Analysis" and "Celestial Lore" decoding for the Pokemon: "${name}" (ID: ${id || 'unknown'}, Types: ${types ? types.join(', ') : 'unknown'}).
    Stats: ${JSON.stringify(stats || {})}.
    Generate custom sci-fi/divine ancient lore that blends Pokémon characteristics with primordial gods, celestial systems, aether frequencies, quantum engines, and majestic relics.
    Ensure the narrative is grandiose, poetic, yet precise and highly futuristic-sacred.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the Aetherium Core AI, an ancient, divine terminal that decodes the true celestial and quantum identities of cosmic entities (Pokemon). Your tone is poetic, mysterious, scientific-divine, and awe-inspiring.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            originEpoch: {
              type: Type.STRING,
              description: "The cosmic time epoch or dimension of synthesis (e.g., 'Pre-Singularity Genesis (v0.04)', 'Prismatic Dawn Era').",
            },
            celestialConcordance: {
              type: Type.STRING,
              description: "An ancient prophecy, divine ritual, or sacred law governing this entity (2 sentences max).",
            },
            aethericFrequency: {
              type: Type.STRING,
              description: "The vibration or radio frequency of this entity with units (e.g. '742.9 MHz', '1.04 GHz').",
            },
            resonanceRating: {
              type: Type.STRING,
              description: "The percentage value indicating spatial-temporal resonance (e.g. '98.7%').",
            },
            quantumResonators: {
              type: Type.ARRAY,
              description: "List of exactly 2 high-tech holy quantum abilities or resonators active in this entity.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Name of the ability, sounding majestic and tech-divine." },
                  description: { type: Type.STRING, description: "Scientific-divine description of what it does (1 sentence)." }
                },
                required: ["name", "description"]
              }
            },
            divineTier: {
              type: Type.STRING,
              description: "The rank in the Celestial Relic hierarchy (e.g. 'Primeval Deity', 'Dimensional Archon', 'Quantum Singularity', 'Astral Emissary').",
            }
          },
          required: ["originEpoch", "celestialConcordance", "aethericFrequency", "resonanceRating", "quantumResonators", "divineTier"]
        }
      }
    });

    const text = response.text;
    if (text) {
      const data = JSON.parse(text.trim());
      return res.json(data);
    } else {
      return res.json(getFallbackLore());
    }
  } catch (error) {
    console.error("Gemini single-pokemon analysis error:", error);
    return res.json(getFallbackLore());
  }
});

// API: Analyze team resonance for a set of 6 Pokemon
app.post("/api/gemini/team-resonance", async (req, res) => {
  const { team } = req.body;

  if (!team || !Array.isArray(team) || team.length === 0) {
    return res.status(400).json({ error: "A team array of Pokemon is required" });
  }

  const getFallbackResonance = () => {
    const totalStats = team.reduce((sum, p) => sum + (p.stats?.reduce((acc: number, s: any) => acc + s.value, 0) || 300), 0);
    const score = (totalStats % 30) + 70;
    return {
      resonanceScore: Math.round(score),
      constellationName: `Constellation of ${team[0].name || 'the Ancients'}`,
      resonanceLore: `This alignment of ${team.length} celestial vectors bridges separate dimensional nodes. Their frequencies converge to generate an localized hyper-harmonic field capable of tearing spatial coordinates.`,
      frequencyAlignment: `${(500 + team.length * 43).toFixed(1)} MHz`,
      synergisticBonds: [
        { title: "Temporal Lock", description: "Binds the timeline variables of the team members to maximize cooperative kinetic response." }
      ]
    };
  };

  if (!ai) {
    return res.json(getFallbackResonance());
  }

  try {
    const prompt = `Analyze the cosmic collective resonance of this 6-pokemon team:
    ${JSON.stringify(team.map(p => ({ name: p.name, types: p.types, stats: p.stats })))}.
    Evaluate how their elemental elements, celestial hierarchy levels, and quantum attributes align.
    Return a comprehensive resonance score, a beautiful name for their collective constellation, high-tech/sacred lore, and key synergistic bonds.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the Aetherium Core AI. You analyze a team of 6 celestial entities to calculate their spatial convergence and divine synergy. Your response is grand, celestial, futuristic-sacred, and scientific-mystic.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            resonanceScore: {
              type: Type.INTEGER,
              description: "Calculated collective resonance percentage (0 to 100).",
            },
            constellationName: {
              type: Type.STRING,
              description: "A beautiful, evocative constellation name for the team (e.g. 'The Zenith Eclipse Conclave').",
            },
            resonanceLore: {
              type: Type.STRING,
              description: "A detailed cosmic reading of their unified potential (2-3 sentences max).",
            },
            frequencyAlignment: {
              type: Type.STRING,
              description: "The combined unified frequency value (e.g., '1.82 GHz Chrono-spatial Alignment').",
            },
            synergisticBonds: {
              type: Type.ARRAY,
              description: "List of exactly 2 unique synergistic bonds forged by this specific alignment.",
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Name of the bond (e.g. 'Vortex Synchronization')." },
                  description: { type: Type.STRING, description: "Explanation of how they amplify each other's divine power (1 sentence)." }
                },
                required: ["title", "description"]
              }
            }
          },
          required: ["resonanceScore", "constellationName", "resonanceLore", "frequencyAlignment", "synergisticBonds"]
        }
      }
    });

    const text = response.text;
    if (text) {
      const data = JSON.parse(text.trim());
      return res.json(data);
    } else {
      return res.json(getFallbackResonance());
    }
  } catch (error) {
    console.error("Gemini team-resonance analysis error:", error);
    return res.json(getFallbackResonance());
  }
});

// Setup dev vs production server routes
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Aetherium Pokedex] Server running on http://localhost:${PORT}`);
  });
}

startServer();
