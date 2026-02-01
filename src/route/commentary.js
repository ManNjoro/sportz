import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db } from "../db/db.js";
import { commentary } from "../db/schema.js";
import { createCommentarySchema, listCommentaryQuerySchema } from "../validation/commentary.js";
import { matchIdParamSchema } from "../validation/matches.js";

export const commentaryRouter = Router({ mergeParams: true });

const MAX_LIMIT = 100;

commentaryRouter.get("/", async (req, res) => {
  try {
    const paramsParsed = matchIdParamSchema.safeParse(req.params);
    if (!paramsParsed.success) {
      return res.status(400).json({ error: 'Invalid match ID', details: paramsParsed.error.issues });
    }

    const queryParsed = listCommentaryQuerySchema.safeParse(req.query);
    if (!queryParsed.success) {
      return res.status(400).json({ error: 'Invalid query parameters', details: queryParsed.error.issues });
    }

    const { id: matchId } = paramsParsed.data;
    const { limit = MAX_LIMIT } = queryParsed.data;

    const results = await db
      .select()
      .from(commentary)
      .where(eq(commentary.matchId, matchId))
      .orderBy(desc(commentary.createdAt))
      .limit(Math.min(limit, MAX_LIMIT));

    res.status(200).json({ data: results });
  } catch (error) {
    console.error("Error fetching commentary:", error);
    res.status(500).json({ error: "Failed to fetch commentary" });
  }
});

commentaryRouter.post("/", async (req, res) => {
  try {
    const paramsParsed = matchIdParamSchema.safeParse(req.params);
    if (!paramsParsed.success) {
      return res.status(400).json({ error: 'Invalid match ID', details: paramsParsed.error.issues });
    }

    const bodyParsed = createCommentarySchema.safeParse(req.body);
    if (!bodyParsed.success) {
      return res.status(400).json({ error: 'Invalid payload', details: bodyParsed.error.issues });
    }

    const { id: matchId } = paramsParsed.data;
    const commentaryData = bodyParsed.data;

    const [newCommentary] = await db
      .insert(commentary)
      .values({
        matchId,
        ...commentaryData,
        // tags: commentaryData.tags ? commentaryData.tags.join(',') : null
      })
      .returning();

    if(res.app.locals.broadcastCommentary) {
      try {
      res.app.locals.broadcastCommentary(newCommentary.matchId, newCommentary)
      } catch (e) {
        console.error('Failed to broadcast commentary',e)
      }
    }

    res.status(201).json({ data: newCommentary });
  } catch (error) {
    console.error("Error creating commentary:", error);
    res.status(500).json({ error: "Failed to create commentary" });
  }
});