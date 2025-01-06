const TASK_REQUIRE_TIME_MS = 5_000;

// Priority queue/ max heap implementation for task scheduling
class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  // Compare tasks by priority, with higher priority coming first
  compare(a, b) {
    return b.priority - a.priority;
  }

  enqueue(task) {
    this.heap.push(task);
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue() {
    if (this.isEmpty()) return null;

    const top = this.heap[0];
    const bottom = this.heap.pop();

    if (!this.isEmpty()) {
      this.heap[0] = bottom;
      this.bubbleDown(0);
    }

    return top;
  }

  bubbleUp(index) {
    const element = this.heap[index];

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (this.compare(element, parent) >= 0) break;

      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];

    while (true) {
      let swapIndex = null;
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;

      if (leftChildIndex < length) {
        const leftChild = this.heap[leftChildIndex];
        if (this.compare(leftChild, element) < 0) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        const rightChild = this.heap[rightChildIndex];
        if (
          (swapIndex === null && this.compare(rightChild, element) < 0) ||
          (swapIndex !== null && this.compare(rightChild, this.heap[swapIndex]) < 0)
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) break;

      this.heap[index] = this.heap[swapIndex];
      this.heap[swapIndex] = element;
      index = swapIndex;
    }
  }

  
  isEmpty() {
    return this.heap.length === 0;
  }

  
  size() {
    return this.heap.length;
  }

  peek() {
    return this.isEmpty() ? null : this.heap[0];
  }
}



// Task queue and processing state
let currentTask = null;
const taskQueue = new PriorityQueue();

/**
 * Processes an task and executes a callback to mark the task as done.
 *
 * @param {Object} task - The task object containing details about the task.
 * @param {string} task.id - Unique identifier for the task.
 * @param {number} task.priority - Priority level of the task (higher is more urgent).
 * @param {string} task.description - A description of the task. Can be empty string.
 * @param {function(string | undefined):void} task.setTaskDone - Callback function to mark the task as complete.
 * It receives an optional message string.
 */
export const processTask = (task) => {
  // If no task is currently running, start processing immediately
  if (!currentTask) {
    startProcessingTask(task);
    return;
  }

  // If the new task has higher priority, pause the current task and start the new task
  if (task.priority > currentTask.priority) {
    
    clearTimeout(currentTask.timeoutId);
    
    
    const remainingTime = currentTask.endTime - Date.now();
    const pausedCurrentTask = {
      ...currentTask,
      remainingTime: remainingTime
    };
    taskQueue.enqueue(pausedCurrentTask);

    
    startProcessingTask(task);
    return;
  }

  taskQueue.enqueue(task);
};


function startProcessingTask(task) {
  
  const processingDuration = task.remainingTime || TASK_REQUIRE_TIME_MS;

  
  currentTask = {
    ...task,
    startTime: Date.now(),
    endTime: Date.now() + processingDuration
  };

  
  currentTask.timeoutId = setTimeout(() => {

    task.setTaskDone(`Task done`);
    currentTask = null;
    processNextTask();

  }, processingDuration);
}


function processNextTask() {
  if (!taskQueue.isEmpty()) {
    const nextTask = taskQueue.dequeue();
    startProcessingTask(nextTask);
  }
}