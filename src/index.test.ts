import axios from "axios"

describe("POST /events", () => {
  test("should return 201 when the event is created", async () => {
    const input = {
      name: "Event 1",
      ticketPriceInCents: 100,
      date: new Date().setHours(new Date().getHours() + 1),
      latitude: 23.5505,
      longitude: 46.6333,
      ownerId: crypto.randomUUID(),
    }

    const response = await axios.post("http://localhost:3000/events", input)

    expect(response.status).toBe(201)
  })
})
