# Fullstack CMS

A modern, responsive content management system built with React, TypeScript, and Tailwind CSS.

## Features

- **Public Pages**: Home, News, About, and Contact pages
- **Admin Panel**: Create, read, update, and delete blog posts
- **Authentication**: Admin login with password protection
- **Responsive Design**: Mobile-friendly interface
- **Local Storage**: Persistent data storage (with support for custom storage APIs)
- **Modern UI**: Clean, professional design using Tailwind CSS

## Project Structure

```
cms-project/
├── src/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── MainPage.tsx
│   │   │   ├── NewsPage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   └── ContactPage.tsx
│   │   ├── modals/
│   │   │   ├── LoginModal.tsx
│   │   │   └── PostFormModal.tsx
│   │   ├── Navigation.tsx
│   │   ├── AdminPanel.tsx
│   │   └── Footer.tsx
│   ├── hooks/
│   │   └── index.ts (usePosts, useAdminSession)
│   ├── utils/
│   │   ├── storage.ts
│   │   └── constants.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── eslint.config.js
```

## Installation

1. Navigate to the project directory:
```bash
cd cms-project
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The app will open in your browser at `http://localhost:3000`

## Building

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Usage

### Admin Panel Access

1. Click the "Admin" button in the top navigation
2. Enter the default password: `admin123`
3. Once authenticated, you'll have access to the Admin Panel

### Managing Posts

- **Create Post**: Click "New Post" button in the Admin Panel
- **Edit Post**: Click the edit icon next to any post
- **Delete Post**: Click the trash icon to delete a post

## Default Credentials

- **Admin Password**: `admin123`

## Technologies Used

- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **Lucide React**: Icon library
- **LocalStorage API**: Data persistence

## Storage

The CMS stores data in browser's localStorage:
- `cms-posts`: Array of blog posts
- `cms-admin-session`: Admin session status
- `cms-admin-password`: Custom admin password (optional)

## Customization

### Change Admin Password

Update the `DEFAULT_ADMIN_PASSWORD` in `src/utils/constants.ts`:
```typescript
export const DEFAULT_ADMIN_PASSWORD = 'your-new-password';
```

### Customize Site Name

Update the site name in `src/components/Navigation.tsx`:
```typescript
<h1 className="text-xl sm:text-2xl font-bold">Your Site Name</h1>
```

### Modify Tailwind Theme

Edit `tailwind.config.js` to customize colors, fonts, and spacing.

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
