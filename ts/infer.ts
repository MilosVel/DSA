type QueueJob<Q extends string, P> = {
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