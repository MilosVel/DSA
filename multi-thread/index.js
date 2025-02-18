// console.log('Algoritams');


// const jobs = Array.from({ length: 100 }, () => 1000000)

// const tick = performance.now();

// for (let job of jobs) {
//     let count = 0
//     for (let i = 0; i < job; i++) {
//         count++
//     }
// }

// const tock = performance.now()

// console.log(`Main thrad took ${tock - tick} ms`);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////


// const { isMainThread } = require('worker_threads')

// if (isMainThread) {
//     // do in main thread
//     console.log('Main thread')
// } else {
//     // do in worker

// }

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////


// //////   Navigirati se u folder multi-thread i pokrenuti node index.js

import { Worker } from 'worker_threads'
const tick = performance.now();
let completedWorkers = 0

function chunkify(array, n) {
    let chunks = []
    for (let i = n; i > 0; i--) {
        chunks.push(array.splice(0, Math.ceil(array.length / i)))
        // console.log('Original araray of jobs',array)
    }
    return chunks
}

function run(jobs, concurrentWorkers) {
    const chunks = chunkify(jobs, concurrentWorkers)
    // console.log(chunks);


    chunks.forEach((data, i) => {
        const worker = new Worker('./worker.js')
        worker.postMessage(data)

        worker?.on('message', (msg) => {
            console.log(`Worker ${i} completed`);

            completedWorkers++

            if (completedWorkers === concurrentWorkers) {
                console.log(`${concurrentWorkers} workers took ${performance.now() - tick} ms`);
                process.exit()
            }


        })
    })
}
const jobs = Array.from({ length: 100 }, () => 1000000)
const concurrentWorkers = 8; // Number of worker threads
run(jobs, concurrentWorkers);
console.log('Original JOBS array zbog splice:', jobs);