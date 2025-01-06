# Priority Task Scheduler

## Environment

1. You definitely need NodeJS version `>=20` such that you can run `.mjs` files directly.
2. Linux environments preferable. `WSL2` for Window might work too.

## What To Build

Modify the function `processTask()` in `challenge.mjs` in such way that:

- **Single Task Processing:** Ensure the program processes only one task at a time.
- **Task Duration:** Each task should be processed for exactly `5` seconds.
- **Priority Handling:**
    - If a new task with **higher priority** arrives while a task is being processed, the program should:
        - Pause the current task.
        - Process the **higher priority** task immediately.
    - Once the higher priority task is completed, the paused task should **resume processing** from where it left off.
- **Task Management:** Maintain a smooth workflow for handling task interruptions and resumptions to ensure no task is lost or delayed indefinitely.

[Video explanation from team Fringecore_](https://www.tella.tv/video/priority-task-scheduler-6lao)

## Details

1. Definitely watch the video for more information.
2. Do not use any external libraries.
3. DO NOT modify/create any other file other than `challenge.mjs`


## Let’s Start
```bash
git clone <link>
cd priority-task-scheduler
code .
node challenge.mjs
```