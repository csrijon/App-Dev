# Admin Panel Debug

| Problem | File | Cause | Fix |
| Routes missing /admin | App.jsx | Already added (/admin/login etc.) | OK |
| No admin CSS/layout | All admin pages | No admin stylesheet | Add shared admin CSS or inline |
| Socket.IO broken | AdminDashboard.jsx | `new (await import('socket.io-client')).io(...)` wrong | Use `io` from socket.io-client |
| Hardcoded API URL | All admin pages | `http://localhost:4000` | Add VITE_API_URL env |
| AdminLogin import missing in App | App.jsx | Already imported | OK |
| No protected route guard | All admin pages | No auth check | Add simple check in pages |
