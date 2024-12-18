// UV_THREADPOOL_SIZE=10 node erick_treads.ts

import {execSync} from "child_process"
import { Worker } from "node:worker_threads"


function getCurrentThreadCount(){
    // obtem quantidade de threads do process e conta
    return parseInt(execSync(`ps -T ${process.pid} | wc -l`).toString())
}

function createThread(data){
    // cria uma thread
    const worker = new Worker('./dist/erick2_task.js')
    const p = new Promise((resolve, reject)=>{
        worker.once('message', (msg)=>{
            return resolve(msg)
        })

        worker.once('error',reject)
    })

    worker.postMessage(data)
    return p

}

const nodejsDefaultThreadNumber = getCurrentThreadCount() - 1 // ignora o process

console.log(
    `Im running`,
    process.pid,
    `default threads: ${nodejsDefaultThreadNumber}`
)

let nodejsThreadCount = 0
const interval = setInterval(()=>{
    // console.log(`running at every sec: ${new Date().toISOString()}`)

    // dessa forma vermo somente as threads que criamos manualmente
    const currentThreads = getCurrentThreadCount() - nodejsDefaultThreadNumber
    if(currentThreads == nodejsThreadCount) return;

    nodejsThreadCount = currentThreads
    console.log(`Current threads: ${nodejsThreadCount}`)
},100)

// const ie20 = 1e20;
// for(let i = 0; i < ie20; i++);



await Promise.all(
    Array.from({ length: 1000 }).map(() => createThread({ from: 0, to: 1e6 }))
).then(result => console.log(result))

clearInterval(interval)