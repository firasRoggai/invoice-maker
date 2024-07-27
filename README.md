# Invoice Generator Tool

## Overview

The Invoice Generator Tool is designed to help freelancers and small businesses manage their invoicing needs efficiently. This project started as a personal hobby to simplify the process of generating and storing professional invoices.

## Features

- **Easy-to-Use Interface**: Create and store invoices effortlessly.
- **Professional Templates**: Generate invoices with a user-friendly design.
- **Reliable Storage**: Keep all your invoices securely in one place.
- **Ongoing Improvements**: Regular updates to enhance functionality and user experience.

## Getting Started

To get started with the Invoice Generator Tool, follow these steps:

### Prerequisites

Make sure you have the following installed:
- Node.js (version 18 or later)
- PostgreSQL (for the database)
- pnpm (optional, but recommended)

### Installation

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/your-username/invoice-generator.git
   cd invoice-generator
   ```

2. **Install Dependencies:**

   Using npm:
   ```sh
   npm install
   ```

   Or using pnpm:
   ```sh
   pnpm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root directory and add your environment variables. An example `.env` file might look like:

   ```env
    NODE_ENV="development"
    DATABASE_URL="your_database_url"
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
    CLERK_SECRET_KEY="your_clerk_secret_key"
   ```

4. **Run Migrations:**

   Apply any database migrations if you have them:

   ```sh
   npx prisma migrate deploy
   ```

5. **Start the Development Server:**

   Using npm:
   ```sh
   npm run dev
   ```

   Or using pnpm:
   ```sh
   pnpm dev
   ```

   The application will be running at `http://localhost:3000`.

### Building for Production

To build and start the application for production:

1. **Build the Application:**

   Using npm:
   ```sh
   npm run build
   ```

   Or using pnpm:
   ```sh
   pnpm build
   ```

2. **Start the Production Server:**

   Using npm:
   ```sh
   npm start
   ```

   Or using pnpm:
   ```sh
   pnpm start
   ```

### Contact Us

If you have any questions, feedback, or need support, feel free to reach out through the following channels:

- [GitHub](https://github.com/firasRoggai)
- [Twitter](https://twitter.com/FirasRoggai)
- [Discord](https://discord.com/users/573895146588864525)

Thank you for checking out the Invoice Generator Tool! We hope it makes your invoicing process smoother and more efficient.