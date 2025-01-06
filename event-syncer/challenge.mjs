// In-memory storage for events
const events = new Map(); // Key -> { deleted: number, data: Array }
const consumedEvents = new Map(); // Key+GroupId -> Number of consumed events
const consumerWaiters = new Map(); // Key+GroupId -> Array of waiters

// Helper to clean up events after 2 minutes
function cleanUpEvent(key) {
  setTimeout(() => {
    const event = events.get(key);
    event.deleted++;
    event.data.shift();
  }, 2 * 60 * 1000); // 2 minutes
}

// Helper to get unconsumed events for a specific key and group
function getUnconsumedEvents(key, groupId) {
  const groupKey = `${key}:${groupId}`;
  const consumed = consumedEvents.get(groupKey) || 0;
  const event = events.get(key);

  if (!event) return [];

  const { deleted, data } = event;

  if (consumed >= deleted + data.length) return [];

  const start = Math.max(consumed, deleted) - deleted;
  return data.slice(start, data.length);
}

export async function push(key, data) {
  if (!events.has(key)) {
    events.set(key, { deleted: 0, data: [] });
  }

  events.get(key).data.push(data);
  cleanUpEvent(key);

  // Handle all waiters for this key
  const waiters = consumerWaiters.get(key) || [];
  for (const resolve of waiters) {
    resolve();
  }
  consumerWaiters.delete(key); // Clear waiters after notifying them
}

export async function blockingGet(key, groupId) {
  const groupKey = `${key}:${groupId}`;

  // Handle uncomsumed events
  const unconsumedEvents = getUnconsumedEvents(key, groupId);
  if (unconsumedEvents.length > 0) {
    const event = events.get(key);
    consumedEvents.set(groupKey, event.deleted + event.data.length);
    return unconsumedEvents;
  }

  // If no events, wait for up to 30 seconds
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve([]); 
    }, 30 * 1000);

    if (!consumerWaiters.has(key)) {
      consumerWaiters.set(key, []);
    }
    consumerWaiters.get(key).push(() => {
      clearTimeout(timeout); 
      
      const eventsToReturn = getUnconsumedEvents(key, groupId);
      if (eventsToReturn.length > 0) {
        const event = events.get(key);
        consumedEvents.set(groupKey, event.deleted + event.data.length);
      }
      resolve(eventsToReturn);
    });
  });
}
