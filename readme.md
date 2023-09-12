# <b>Ecommerce Website</b>

<!-- [Webpage](https://curious-lokum-f601fa.netlify.app/)
Ecommerce website built on the following technology stack- -->

This project is an ecommerce website that allows users to sign up or log in and add products to their personal carts from a list of available items. It supports secure payment transactions through the Stripe payment gateway and manages user authorization using JSON web tokens (JWT). The application is built using Node.js and Express.js for the backend, React.js for the frontend, and Postgres for storing data.

### <b>Website Link</b>

You can access the hosted website by clicking [here.](https://ecommerce2-rg4r.vercel.app/)

### <b>Tech Stack</b>

- Postgres
- Node.js
- Express.js + typescript
- TypeORM
- passport.js JWT strategy
- React.js
- Redux store
- Shadcn UI + tailwind

### <b>Features</b>

- User signup and login functionality
- User authorization through passport.js JSON web tokens (JWT)
- Pagination to reduce load from the server and improved UX.
- Search based on product Name/Title/Category/Description
- Users can add products to their cart
- Secure payment processing with Stripe
- Node mailer to send confirmation email to users' email ID
- Email service a microservice seperate from ecommerce.
- Communication takes place between these two services through BullMQ (a message broker).
- BullMQ is based on top of Redis hence, messages travel through a redis server.
- Frontend was developed using react, redux, and redux thunk middleware.
- Shadcn and tailwindcss improved the overall design of the frontend

# Showcase

## Login page

![Login Page](http://url/to/img.png)
