# GIC Scientific – Inventory System – API

This is the backend API for the GIC Scientific Inventory System. It serves as a middleware between the SQL Server database and various clients, including Office.js Add-ins. Built with Node.js and Express, this API provides secure, structured access to inventory, production, and audit data.

---

## Project Structure

```
gic-inventory-api/
├── controllers/      # Business logic per module (inventory, production, etc.)
├── routes/           # API route definitions
├── models/           # SQL query helpers
├── middleware/       # Auth, error handling, etc.
├── config/           # DB and environment configuration
├── services/         # Utility services (e.g., backups, logging)
├── logs/             # Log output
├── scripts/          # Migration/seeding scripts
├── tests/            # Unit and integration tests
├── .env              # Environment-specific config (not committed)
├── server.js         # Main app entry point
└── package.json      # Project metadata and dependencies
```

---

## Installation

Clone and install dependencies:

```bash
git clone https://your-git-hosting.com/gic-inventory-api.git
cd gic-inventory-api
npm install
```

---

## Configuration

Create a `.env` file in the root directory with the following content:

```env
DB_HOST=localhost
DB_PORT=1433
DB_USER=your_user
DB_PASS=your_password
DB_NAME=gic_inventory
JWT_SECRET=supersecurekey
```

---

## Running the Server

To start the development server:

```bash
npm start
```

> The server will run on the port defined in `.env` (default: 3000)

---

## Authentication

- All API routes are protected using **JWT**.
- Tokens can be obtained via the `/login` endpoint (if implemented).

---

## Testing

This project uses the following tools for testing:

- **Jest**
- **Supertest**

Run tests with:

```bash
npm test
```

---

## Database

- **Type:** Microsoft SQL Server Express
- **Configuration:** `config/db.js`
- **Migrations:** Located in the `scripts/` directory

---

## Security Practices

- Use of **parameterized queries** to prevent SQL injection
- **JWT-based route protection**
- Restrict API access to **HTTPS**
- Use `.env` files for storing **sensitive credentials**

---

## Deployment

To deploy this project run:

```bash
npm run deploy
```

---

## License

© 2025 GIC Scientific. All rights reserved.

---

## Authors

- [@degen101](https://www.github.com/degen101)

---

## Contact

For questions or collaboration, contact the GIC Scientific development team.
