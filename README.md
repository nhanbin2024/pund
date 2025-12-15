# Zombie Puncher (Next.js + Canvas) — Javi vs Bots

Game web 2D chạy trên trình duyệt (desktop-first).

## Controls
- Move: WASD / Arrow
- Punch: Space or Mouse Click
- Pause: P (hoặc nút Pause/Resume)

## Run local
```bash
npm install
npm run dev
```
Open: http://localhost:3000

## Build & start
```bash
npm run build
npm start
```

## Deploy Vercel
Push lên GitHub -> Import vào Vercel (Next.js auto-detect). Không cần cấu hình thêm.

## Assets (optional)
Thay thế file trong `public/assets/`:
- player.svg
- zombie.svg
- zombie_big.svg
- bg.svg
Nếu không có, game vẫn chạy bằng hình khối (fallback).
