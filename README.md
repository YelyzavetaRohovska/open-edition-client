# 🧩 open-edition-client

A minimal TypeScript SDK for interacting with the **Neptune DXP – Open Edition** User API.

---

## 📦 Installation

Install the package using npm:

```bash
npm install @yelyzavetarohovska/open-edition-client
```

> **Note:**  
> Before installing, make sure you have an `.npmrc` file configured in your project with the following content:  
> 
> ```
> @yelyzavetarohovska:registry=https://npm.pkg.github.com/
> //npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}
> ```
> 
> Replace `${GITHUB_TOKEN}` with a valid GitHub personal access token that has permission to access GitHub Packages.

---

## ⚙️ Setup

Before using the client, make sure you have:

- The **host** and **port** of your Open Edition instance.
- A valid **Bearer token** for authorization.

---

## 🚀 Usage

Here's a simple example of how to use the SDK:

```ts
import { OEClient } from '@yelyzavetarohovska/open-edition-client';

const host = 'http://localhost';
const port = 8080;
const token = '<your-auth-token>';

const oeClient = new OEClient({ host, port, token });

async function main() {
  const userList = await oeClient.getUserList();
  console.log('Users:', userList);

  const user = await oeClient.getUserById('123');
  console.log('User:', user);
}

main();
```

---

## 🧪 Testing

Run tests using:

```bash
npm test
```

To generate coverage:

```bash
npm run test:coverage
```

Test cases include:

- Successful authentication
- Fetching user list
- Fetching a user by ID

---

## 🛠 Development

### Clone the Repository

```bash
git clone https://github.com/yelyzavetarohovska/open-edition-client.git
cd open-edition-client
npm install
```

### Useful Scripts

```bash
npm run build       # Compile TypeScript into dist/
npm run test        # Run unit/integration tests
npm run prepare     # Hook to build before publish
```

### Publish

```bash
npm run build
npm publish
```

---

## ✅ Features

- 🔒 Authenticated API access via Bearer token
- 👤 `getUserList()` – Retrieve a list of users
- 🧍 `getUserById(id)` – Fetch a specific user by ID
- 💡 Fully typed with TypeScript
- 🧪 Includes tests
- 📤 Ready to publish to GitHub Packages or npm

---

## 📝 License

ISC