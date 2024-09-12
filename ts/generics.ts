type Job = {
    name: string;
    start: () => void;
    state: 'incomplete' | 'success' | 'failure'
}

type JobRun<J extends Job> = {
    job: J;
    state: 'queued' | 'running' | 'completed';
    onComplete: (cb: (job: J) => void) => void
}

type SendemailJob = Job & {
    receipentEmail:string;
    subject:string
}

function enqueueJob <T extends Job>(job:T):JobRun<T>{
    return {
        job,
        state:'queued',
        onComplete:(cb:(job:T)=>void)=>cb(job)
    }
}

const j : SendemailJob = {
    receipentEmail:'jon@doe.com',
    subject:' hi there',
    name: 'send-email',
    start: () => null,
    state: 'incomplete'
}

const run = enqueueJob(j)

run.onComplete((job)=>{
    job
})