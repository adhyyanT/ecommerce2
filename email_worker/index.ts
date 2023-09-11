import { Job, Queue, Worker } from 'bullmq';
import dotenv from 'dotenv';
import IORedis from 'ioredis';
import nodeMailer from 'nodemailer';
dotenv.config();

const transporter = nodeMailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.email_id,
    pass: process.env.email_pass,
  },
});

const con = new IORedis(process.env.redis_url!, {
  maxRetriesPerRequest: null,
});

console.log('[X] Listening ');
const worker = new Worker(
  'email_queue',
  async (job: Job) => {
    const options = {
      from: process.env.email_id,
      to: job.data.emailId,
      subject: 'Order placed successfully!',
      text: `summary: ${job.data.emailProducts}`,
      html: `
      <h2>Hi ${job.data.name}. This is a confirmation email regarding your purchase of $${job.data.total} on Ecommerce </h2>
      <p>Thanks & Regards </p>
      <p>Ecommerce inc.</p>
        `,
    };
    transporter.sendMail(options, (error, info) => {
      if (error) {
        console.log(error);
      }
      console.log(info.response);
    });
  },
  {
    connection: con,
  }
);
