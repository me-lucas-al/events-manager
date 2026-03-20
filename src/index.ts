import "dotenv/config"

import { drizzle } from "drizzle-orm/node-postgres"
import express from "express"

import * as schema from "./db/schema"
const app = express()

app.use(express.json())

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not defined")

const db = drizzle(process.env.DATABASE_URL, { schema })

app.post("/events", async (req, res) => {
  try {
    const { name, ticketPriceInCents, date, latitude, longitude, ownerId } =
      req.body

    if (
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
        ownerId
      )
    ) {
      return res.status(400).json({ error: "Invalid owner ID" })
    }

    if (ticketPriceInCents < 0) {
      return res.status(400).json({ error: "Invalid ticket price" })
    }

    if (name.length < 3) {
      return res.status(400).json({ error: "Invalid name" })
    }

    if (new Date(date) < new Date()) {
      return res.status(400).json({ error: "Invalid date" })
    }

    if (latitude < -90 || latitude > 90) {
      return res.status(400).json({ error: "Invalid latitude" })
    }

    if (longitude < -180 || longitude > 180) {
      return res.status(400).json({ error: "Invalid longitude" })
    }

    const event = await db.insert(schema.eventsTable).values({
      ownerId,
      ticketPriceInCents,
      date: new Date(date),
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      name,
    })

    return res.status(201).json(event)
  } catch (error) {
    console.error("Error creating event:", error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
