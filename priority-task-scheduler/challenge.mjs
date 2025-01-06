const TASK_REQUIRE_TIME_MS = 5_000;
// Modify the function below to process each task for 5 secs
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
  task.setTaskDone("Not implemented");
};
