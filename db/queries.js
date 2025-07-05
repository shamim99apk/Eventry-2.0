import { eventModel } from "@/models/event-models";
import { userModel } from "@/models/user-model";

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

async function getAllEvents() {
  const allEvents = await eventModel.find().lean();
  return replaceMongoIdInArray(allEvents);
}

async function getEventById(eventId) {
  const event = await eventModel.findById(eventId).lean();
  return replaceMongoIdInObject(event);
}

async function createUser(userData) {
  return await userModel.create(userData);
}

export { createUser, getAllEvents, getEventById };
