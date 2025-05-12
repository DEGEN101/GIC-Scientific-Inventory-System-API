---
project:
  name: "GIC Scientific – Inventory System – API"
  description: >
    This is the backend API for the GIC Scientific Inventory System. It serves as a middleware between
    the SQL Server database and various clients, including Office.js Add-ins. Built with Node.js and Express,
    this API provides secure, structured access to inventory, production, and audit data.

structure:
  root_folder: gic-inventory-api
  layout:
    - controllers/: "Business logic per module (inventory, production, etc.)"
    - routes/: "API route definitions"
    - models/: "SQL query helpers"
    - middleware/: "Auth, error handling, etc."
    - config/: "DB and environment configuration"
    - services/: "Utility services (e.g., backups, logging)"
    - logs/: "Log output"
    - scripts/: "Migration/seeding scripts"
    - tests/: "Unit and integration tests"
    - .env: "Environment-specific config (not committed)"
    - server.js: "Main app entry point"
    - package.json: "Project metadata and dependencies"

getting_started:
  steps:
    - step: "Clone the repo"
      commands:
        - git clone https://your-git-hosting.com/gic-inventory-api.git
        - cd gic-inventory-api

    - step: "Install dependencies"
      commands:
        - npm install

    - step: "Configure environment"
      instructions: "Create a .env file with the following content:"
      env_template:
        DB_HOST: "localhost"
        DB_PORT: "1433"
        DB_USER: "your_user"
        DB_PASS: "your_password"
        DB_NAME: "gic_inventory"
        JWT_SECRET: "supersecurekey"

    - step: "Run the server"
      commands:
        - npm start
      note: "Server will start on the port defined in .env (default: 3000)"

authentication:
  method: "JWT"
  notes:
    - "All API routes are protected with JWT."
    - "Obtain a token via the /login endpoint (if implemented)."

testing:
  tools:
    - Jest
    - Supertest
  command: npm test

database:
  type: "Microsoft SQL Server Express"
  config_file: "config/db.js"
  migration_directory: "scripts/"

security:
  practices:
    - "Use of parameterized queries to prevent SQL injection"
    - "JWT-based route protection"
    - "Restrict API access to HTTPS"
    - "Use .env to store sensitive credentials"

license: "© 2025 GIC Scientific. All rights reserved."

contact:
  note: "For questions or collaboration, contact the GIC Scientific development team."
---
