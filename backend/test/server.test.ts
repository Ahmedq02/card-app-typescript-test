import { server } from "../src/server"
import Prisma from "../src/db";
import Fastify, {FastifyInstance} from "fastify";
import { server as createServer } from '../src/server';
import { Entry } from '@prisma/client';

describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });
});

let fastify: FastifyInstance;

beforeAll(async () => {
  fastify = createServer; 
  await fastify.listen({ port: 0 });
});

afterAll(async () => {
  await fastify.close();
});

describe("Fastify Server Tests", () => {

  // Successfully return the array of entries
  test("GET /get/ should return an array of entries", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/get/",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toBeInstanceOf(Array);
  });

  // Successfully get an entry by id
  test("GET /get/:id should return a single entry by ID", async () => {
    const newEntry = await Prisma.entry.create({
      data: {
        id: "test-id",
        title: "Test Entry",
        description: "This is a test entry.",
        scheduled: new Date(),
        created_at: new Date(),
      },
    });
  
    const response = await fastify.inject({
      method: "GET",
      url: `/get/${newEntry.id}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveProperty("id", newEntry.id);
    await Prisma.entry.delete({ where: { id: newEntry.id } });
  });

  // Successfully create a new entry
  test("POST /create/ should create a new entry", async () => {
    const newEntry: Entry = {
      id: "test-id",
      title: "Test Entry",
      description: "This is a test entry.",
      scheduled: new Date(),
      created_at: new Date(),
    };

    const response = await fastify.inject({
      method: "POST",
      url: "/create/",
      payload: newEntry,
    });

    // Convert dates to ISO strings for comparison
    const expectedEntry = {
      ...newEntry,
      scheduled: newEntry.scheduled.toISOString(),
      created_at: newEntry.created_at.toISOString(),
    };

    expect(response.statusCode).toBe(200);
    // Compare the two entries
    expect(response.json()).toMatchObject(expectedEntry);
  });

  // Successfully update an existing entry
  test("PUT /update/:id should update an existing entry", async () => {
    const updatedEntry: Partial<Entry> = {
      title: "Updated Title",
    };

    const response = await fastify.inject({
      method: "PUT",
      url: "/update/test-id",
      payload: updatedEntry,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveProperty("msg", "Updated successfully");
  });

  // Successfuly delete an existing entry
  test("DELETE /delete/:id should delete an entry by ID", async () => {
    const response = await fastify.inject({
      method: "DELETE",
      url: "/delete/test-id",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveProperty("msg", "Deleted successfully");
  });

  // Fail to create entry with missing fields
  test("POST /create/ should fail if required fields are missing", async () => {
    const incompleteEntry = {
      id: "test-id",
      scheduled: new Date(),
      created_at: new Date(),
    };

    const response = await fastify.inject({
      method: "POST",
      url: "/create/",
      payload: incompleteEntry,
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toMatchObject({ msg: "Error creating entry" });
  });

  // Fail to fetch a non-existing entry by ID
  test("GET /get/:id should fail if the entry does not exist", async () => {
    const nonExistingId = 'non-existing-id';

    const response = await fastify.inject({
      method: "GET",
      url: `/get/${nonExistingId}`,
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toMatchObject({ msg: `Error finding entry with id ${nonExistingId}` });
  });

  // Fail to update a non-existing entry by ID
  test("PUT /update/:id should fail if the entry does not exist", async () => {
    const nonExistingId = "non-existing-id";
    const updateData: Entry = {
      id: nonExistingId,
      title: "Updated Title",
      description: "Updated Description",
      scheduled: new Date(),
      created_at: new Date(),
    };

    const response = await fastify.inject({
      method: "PUT",
      url: `/update/${nonExistingId}`,
      payload: updateData,
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toMatchObject({ msg: "Error updating" });
  });

  // Fail to delete a non-existing entry by ID
  test("DELETE /delete/:id should fail if the entry does not exist", async () => {
    const nonExistingId = 'non-existing-id';

    const response = await fastify.inject({
      method: "DELETE",
      url: `/delete/${nonExistingId}`,
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toMatchObject({ msg: "Error deleting entry" });
  });
});