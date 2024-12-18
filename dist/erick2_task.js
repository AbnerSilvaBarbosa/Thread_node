import { threadId, parentPort } from "node:worker_threads";
parentPort.once("message", ({ from, to }) => {
    console.time(`benchmark-${threadId}`);
    let count = 0;
    // const ie20 = 1e20;
    for (let i = from; i < to; i++) {
        count++;
    }
    console.timeEnd(`benchmark-${threadId}`);
    parentPort.postMessage(`Thread ${threadId} finished with count: ${count}`);
});
//# sourceMappingURL=erick2_task.js.map