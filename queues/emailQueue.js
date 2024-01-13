const {Worker} = require('bullmq')
export async function mockSendEmail(payload) {
    const { from, to, subject, body } = payload;
    return new Promise((resolve, reject) => {
        console.log(`Sending Email to ${to}....`);
        setTimeout(() => resolve(1), 2 * 1000);
    });
}

const emailWorker = new Worker('email-queue', async (job) => {
    const data = job.data;
    await mockSendEmail({
        from: data.from,
        to: data.to,
        subject: data.subject,
        body: data.body
    });
}, {
        connection: {
            host: "redis-13c54108-pg-chat-app.a.aivencloud.com",
            port: 12387,
            username: "default",
            password: "AVNS_FN0U-SeHK1cp0v34V8B"
        }
})