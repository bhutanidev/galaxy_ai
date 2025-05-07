# 🖼️ AI Image Transformation App

A modern AI-powered image-to-image transformation web app built with **Next.js**, **Clerk**, **Cloudinary**, **Fal.ai**, and **Shadcn UI**. Users can sign in, upload images, run transformations, and view/download results — all stored securely.

---

## 🚀 Tech Stack

| Tech                   | Use Case                                 |
| ---------------------- | ---------------------------------------- |
| **Next.js App Router** | Frontend + Backend                       |
| **Clerk**              | Authentication (sign-in/sign-up/session) |
| **MongoDB + Mongoose** | Database to persist transformations      |
| **Fal.ai**             | AI-based image transformation API        |
| **Cloudinary**         | Store original and transformed images    |
| **Shadcn/UI**          | Modern UI components & theming           |

---

## 🌍 Environment Variables

Ensure the following environment variables are added to `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
MONGODB_URL=mongodb+srv://your-db-url

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloud_key
CLOUDINARY_API_SECRET=your_cloud_secret

NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=http://localhost:3000/
FAL_KEY=your_fal_api_key
```

---

## 🧾 Folder Structure

```bash
src/
├── app/
│   ├── api/                 # API routes (e.g., /api/sign, /api/video)
│   ├── dashboard/           # Dashboard UI (authenticated)
│   ├── not-found.tsx        # Custom 404 page
│   └── page.tsx             # Home page
├── components/              # UI and reusable components
├── helper/                  # Utility functions, data helpers
├── hooks/                   # Custom hooks
├── lib/                     # DB connection, cloudinary, fal
├── utils/
│   ├── downloadableUrl.ts   # Transform cloudinary URLs
│   ├── generateUploadSignature.ts # Secure upload handler
│   └── middleware.ts        # Next.js middleware (auth, etc.)
└── styles/globals.css       # Global styles
```

---

## 💡 Features

* 🔐 Secure login/signup via **Clerk**
* 📄 Upload images and receive a transformed version
* 🧠 AI transformation using **Fal.ai**
* ☁️ Store both original and result via **Cloudinary**
* 🎨 Fully theme-sensitive UI using **Shadcn UI**
* ✅ MongoDB stores transformation records per user

---

## ⚙️ Setup Instructions

1. **Clone the repo**:

```bash
git clone https://github.com/your-username/image-ai-transform.git
cd image-ai-transform
```

2. **Install dependencies**:

```bash
pnpm install
```

3. **Add `.env.local`** (use above values)

4. **Run locally**:

```bash
pnpm dev
```

5. Visit: `http://localhost:3000`

---

## 📸 API & Cloud Functions

### `/api/sign/upload`

Generates a Cloudinary signature for secure upload.

### `/api/video/transform`

Handles Fal.ai image transformation request.

---

## 🖼️ Screenshots

![Screenshot](public/LandingPagw.png)


---

## 🛡️ Safety Page (404)

All unknown routes redirect to a safety fallback:

* `app/not-found.tsx` shows a friendly message and a `Go Home` button
* Styled using `shadcn/ui`

---

## 📝 License

MIT License © 2025 \[Your Name]
