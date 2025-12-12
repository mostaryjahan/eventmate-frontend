# EventMate

This is the frontend for the EventMate platform, built with Next.js (App Router), TypeScript, and Tailwind CSS. It allows users to explore events, join activities, create events as a Host, and manage profiles with a clean and responsive UI.

## Live Demo

**Frontend Live**: [https://eventmate-brown.vercel.app](https://eventmate-brown.vercel.app)

## Repository

**Server Repository**: `https://github.com/mostaryjahan/eventmate-server.git`

**Frontend Repository**: `https://github.com/mostaryjahan/eventmate-frontend.git`

## Features

- User authentication with role-based access (User, Host, Admin)
- Browse and search events by category, date, and location
- Create, edit, and manage events (Host)
- Join and leave events (User)
- User profile management
- Ratings & reviews for hosts
- Payment integration support (Stripe)
- Responsive UI with Tailwind + DaisyUI
- Cloudinary image upload
- Toast notifications using Sonner

---

### Folder Structure

```bash
frontend/
 ├── app/
 │   ├── (auth)/login, register
 │   ├── (main)/events, profile, dashboard
 │   ├── components/
 │   │   ├── shared/
 │   │   ├── modules/
 │   ├── utils/
 │   └── styles/
 ├── public/
 ├── next.config.js
 ├── package.json
 └── tsconfig.json
```
---
### Routes

| Route               | Description               |
| ------------------- | ------------------------- |
| `/`                 | Landing page              |
| `/login`            | Login page                |
| `/register`         | Register page             |
| `/profile/[id]`     | Profile page              |
| `/events`           | Event listing             |
| `/events/[id]`      | Event details             |


---

### Installation
```
git clone https://github.com/mostaryjahan/eventmate-frontend.git
cd eventmate-frontend
npm install 
or 
pnpm install

```

### Environment Variables
Create `.env` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

```

### Run Development Server
```
npm run dev
or
pnpm dev
```

#### Open
```
http://localhost:3000
```

## Technologies Used

- Next.js (App Router)
- TypeScript
- Tailwind CSS + Shadcn UI
- React
- Cloudinary
- Sonner
- Stripe
- Axios 
- Zod

## Scripts
```bash
npm run dev
or
pnpm dev

npm run build 
or
pnpm build

npm start
or
pnpm start

npm run lint
or
pnpm lint

npm run format
or
pnpm format

```

## Notes

- Backend API URL must match NEXT_PUBLIC_API_URL
- Image hosting works via Cloudinary
- Navigation and dashboard content change based on user role