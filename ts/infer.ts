import { never } from "zod"

type QueueJob<Q extends String, P> = {
    queue: Q,
    payload: P
}

type WelcomeEmail = {
    to: string,
    body: string
}

type ProcessPayment = {
    userName: string,
    accountId: number
}

type WelcomeEmailJob = QueueJob<'email', WelcomeEmail>
type ProcessPaymentJob = QueueJob<'batch', ProcessPayment>

////     Varijanta 1
type QueueName<J extends QueueJob<string, unknown>> = J extends QueueJob<infer N, unknown> ? N : never

// ////     Varijanta 2
// type QueueName<J extends QueueJob<string, unknown>> = J['queue']; // Corrected



// // ////     Varijanta 3
// type QueueName<J extends QueueJob<string, unknown>> = {
//     queue: J['queue'];
//     payloadType: J['payload'];
//   };

type EmailQueue = QueueName<WelcomeEmailJob>
type PaymentQueue = QueueName<ProcessPaymentJob>




///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////// Matt Pocock -  Infer is easier than you think
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

type ReturnTypeDocumentation<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

type FakeReturnType<T> = T extends ((...args: any) => infer R extends string) ? `${R}_return type` : never



const func = (check: boolean) => {
    // return '122121' 
    return '122121' as const
}

type FunctionResult = FakeReturnType<typeof func>


type ReturnValue = ReturnTypeDocumentation<typeof func>

////////////////////////

type GetFromDeepObject<T> = T extends {
    a: {
        b: {
            c: infer C
        }
    }
} |
{
    a: {
        c: infer C
    }
}
    ? C : never



type C = GetFromDeepObject<{
    a: {
        b: {
            c: string
        }
    }
}>

