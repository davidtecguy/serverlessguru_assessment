# Coffee Shop API (Serverless CRUD)

A fully serverless REST API for a Coffee Shop, built with AWS Lambda, API Gateway, and DynamoDB using the Serverless Framework. Supports full CRUD operations (Create, Read, Update, Delete) for menu items, with automated infrastructure and CI/CD via GitHub Actions.

---

## Features
- **AWS API Gateway**: RESTful endpoints
- **AWS Lambda**: Node.js/TypeScript handlers for each CRUD operation
- **DynamoDB**: Stores menu items
- **Serverless Framework**: Infrastructure as Code (IAC)
- **CI/CD**: GitHub Actions pipeline for multi-stage deployments (`dev`, `prod`)
- **Unit/Integration Tests**: Jest and aws-sdk-client-mock
- **Business Case**: Coffee Shop menu management

---

## Project Structure
```
your-project/
├── src/handlers/         # Lambda handlers (CRUD)
│   ├── createItem.ts
│   ├── getItem.ts
│   ├── updateItem.ts
│   ├── deleteItem.ts
│   └── listItems.ts
├── tests/                # Unit/integration tests
│   ├── unit/
│   └── integration/
├── .github/workflows/    # GitHub Actions CI/CD
│   └── deploy.yml
├── serverless.yml        # Serverless config (IAC)
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

---

## API Endpoints
| Method | Path         | Description         |
|--------|--------------|--------------------|
| POST   | /items       | Create item        |
| GET    | /items/{id}  | Get item by ID     |
| PUT    | /items/{id}  | Update item by ID  |
| DELETE | /items/{id}  | Delete item by ID  |
| GET    | /items       | List all items     |

---

## Setup & Installation
1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure AWS credentials** (via `aws configure` or environment variables)
4. **Deploy to AWS**
   ```bash
   npx serverless deploy --stage dev
   # or for production
   npx serverless deploy --stage prod
   ```

---

## CI/CD Pipeline (GitHub Actions)
- Located at `.github/workflows/deploy.yml`
- Triggers on push to `main` or `master`
- Installs dependencies, configures AWS, and deploys using Serverless Framework
- Supports multi-stage deployments (e.g., `dev` for feature branches, `prod` for main)
- Add your AWS credentials as GitHub secrets: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`

---

## Testing
- **Unit tests**: `npm test`
- **Integration tests**: Place in `tests/integration/`
- Uses `aws-sdk-client-mock` for mocking DynamoDB in tests

---

## Business Case Example
This API is designed for a Coffee Shop to manage its menu items (e.g., add new drinks, update prices, remove items, and list the menu).

---

## Screenshots & Video
- Include screenshots of the GitHub Actions pipeline and AWS Console in this section.
- Record a Loom video walkthrough of the code, infrastructure, and CI/CD pipeline.

---

## License
MIT 

---

## **How to Fix**

### 1. **Explicitly Install Serverless Framework in Your Workflow**

Add a step in your GitHub Actions workflow to install the latest Serverless Framework globally before running deploy:

```yaml
- name: Install Serverless Framework
  run: npm install -g serverless
```

**Place this step before** the `npx serverless deploy` step.

---

### 2. **(Recommended) Add Serverless as a Dev Dependency**

Add Serverless Framework to your project’s `package.json`:

```bash
npm install --save-dev serverless
```

Then, in your workflow, use:

```yaml
- name: Deploy with Serverless
  run: npx serverless deploy --stage prod
```

This ensures the correct version is always available.

---

### 3. **Check for Version Mismatches**

- If you have a `package.json` with a `serverless` version, make sure it matches what you want (v4 is the latest).
- If you want to use v3, specify it explicitly:
  ```bash
  npm install --save-dev serverless@3
  ```

---

## **Summary of Steps for GitHub Actions**

**Example workflow snippet:**
```yaml
- name: Install dependencies
  run: npm ci

- name: Install Serverless Framework
  run: npm install -g serverless

- name: Deploy with Serverless
  run: npx serverless deploy --stage prod
```

Or, if you add it as a dev dependency:
```yaml
- name: Install dependencies
  run: npm ci

- name: Deploy with Serverless
  run: npx serverless deploy --stage prod
```

---

**Choose one of the above solutions and re-run your workflow.**  
If you want to use a specific version, install it explicitly. If you want the latest, just install globally or as a dev dependency. 