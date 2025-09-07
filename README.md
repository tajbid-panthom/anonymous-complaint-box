
# Anonymous Complaint Box

>A secure, anonymous platform for reporting corruption, injustice, or wrongdoing in Bangladesh. Built with Next.js, Drizzle ORM, Neon PostgreSQL, and Tailwind CSS.

---

## 🚀 Features

- **Anonymous Complaint Submission:** Report issues without revealing your identity
- **Case Tracking:** Track the status of your complaint using a unique Case ID and PIN
- **Admin Portal:** Secure login for authorized admins to manage, review, and update complaints
- **Analytics & Export:** View complaint statistics and export data as CSV
- **Professional UI/UX:** Modern, responsive design with clear navigation and feedback

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Database:** Neon PostgreSQL (serverless)
- **ORM:** Drizzle ORM & Drizzle Kit
- **Styling:** Tailwind CSS
- **Authentication:** bcryptjs, cookie
- **ID Generation:** nanoid
- **Linting:** ESLint
- **Other:** React 19, TypeScript 5

---

## ⚡ Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/tajbid-panthom/anonymous-complaint-box.git
cd anonymous-complaint-box
pnpm install # or npm/yarn/bun
```

### 2. Configure Environment

Create a `.env.local` file with your Neon/PostgreSQL connection string:

```env
DATABASE_URL="postgresql://<username>:<password>@<host>/<db>"
```

### 3. Run Migrations

```bash
pnpm drizzle-kit generate:sqlite # or your preferred migration command
pnpm drizzle-kit migrate
```

### 4. Create Demo Admin (Optional)

To access the admin dashboard, you need an admin account. Create a demo admin with:

```bash
pnpm create-admin
```

**Demo Admin Credentials:**
- **Username:** `admin`
- **Password:** `admin123`
- **Access:** Visit `/admin` and login with these credentials

> ⚠️ **Security Note:** Change the admin password in production! This is only for development/demo purposes.

### 5. Start Development Server

```bash
pnpm dev
# Visit http://localhost:3000
```

---

## 📝 Usage Guide

### User Side
- **Submit Complaint:** Go to `/submit`, fill out the form, and receive a Case ID & PIN
- **Track Case:** Go to `/track`, enter your Case ID & PIN to view status

### Admin Side
- **Login:** Go to `/admin`, enter credentials
- **Dashboard:** View, update, and export complaints
- **Analytics:** View statistics by category/status

---

## 👤 Admin Management

### Creating Demo Admin
```bash
# Option 1: Using npm script (recommended)
pnpm create-admin

# Option 2: Direct node command
node scripts/create-demo-admin.js
```

### Manual Admin Creation
If you prefer to create admin manually, you can:

1. **Connect to your database** (PostgreSQL/Neon)
2. **Insert admin record** with hashed password:

```sql
-- Replace 'your_username' and 'hashed_password' with actual values
INSERT INTO admins (username, password_hash, role) 
VALUES ('your_username', '$2a$10$...hashed_password...', 'admin');
```

3. **Hash password using bcrypt** (strength: 10)

### Admin Roles
- `super_admin` - Full access to all features
- `admin` - Standard admin access
- `moderator` - Limited access (view only)

---

## 📚 API Endpoints

### Public
- `POST /api/complaints` — Submit a new complaint
- `POST /api/track` — Track complaint status

### Admin
- `POST /api/admin/login` — Admin authentication
- `GET /api/admin/complaints` — List all complaints
- `GET /api/admin/analytics` — Complaint statistics
- `GET /api/admin/export` — Export complaints as CSV
- `POST /api/admin/update-status` — Update complaint status

---

## 🖥️ UI/UX Highlights

- **Bluish themed admin login page**
- **Bold Admin Portal button in navigation bar**
- **Descriptive, concise placeholders**
- **Cursor pointer on all buttons**
- **Responsive, professional design**

---

## 🤝 Contributing

1. Fork the repo & clone locally
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes & push
4. Open a Pull Request

---

## 📝 License

MIT

---

## 💡 Credits

- Built with [Next.js](https://nextjs.org/), [Drizzle ORM](https://orm.drizzle.team/), [Neon](https://neon.tech/), and [Tailwind CSS](https://tailwindcss.com/)

---

## 📦 Deployment

Deploy easily on [Vercel](https://vercel.com/) or your preferred platform. See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
