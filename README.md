# Slavalarionov Project

Моно-репозиторий для веб-платформы, включающей фронтенд, CMS и backend на NestJS.

---

## Структура репозитория

- [`slavalarionov-frontend/`](./slavalarionov-frontend) — клиентское приложение на **Next.js** (React, MobX, React Query)
- [`slavalarionov-cms/`](./slavalarionov-cms) — headless CMS на **Next.js** с кастомными коллекциями и компонентами
- [`slavalarionov-backend/`](./slavalarionov-backend) — backend на **NestJS** (Node.js, TypeScript)

---

## Быстрый старт

1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/hashc0d3/slavalarionov.git
   cd slavalarionov
   ```

2. **Установите зависимости для всех пакетов:**
   ```bash
   cd slavalarionov-frontend && npm install
   cd ../slavalarionov-cms && npm install
   cd ../slavalarionov-backend && npm install
   ```

3. **Запустите сервисы (каждый в отдельном терминале):**

   - **Frontend:**
     ```bash
     cd slavalarionov-frontend
     npm run dev
     # Откроется на http://localhost:3000
     ```

   > **Внимание:** Для работы CMS требуется установленная база данных **PostgreSQL**.  
   > Пример строки подключения:
   > ```
   > DATABASE_URI=postgres://postgres:password@localhost:5432/payload
   > ```

   - **CMS:**
     ```bash
     cd slavalarionov-cms
     npm run dev
     # Откроется на http://localhost:3001 (или другой порт)
     ```

   - **Backend:**
     ```bash
     cd slavalarionov-backend
     npm run start:dev
     # Откроется на http://localhost:4000
     ```

4. **Настройте переменные окружения** в файлах `.env.local` или `.env` для каждого пакета.

---

## Основные технологии

- **Frontend:** Next.js, React 19, MobX, React Query, TypeScript
- **CMS:** Next.js, кастомные коллекции, TailwindCSS
- **Backend:** NestJS, TypeScript

---

## Схема работы

```mermaid
flowchart TD
    A[Пользователь] --> B[Frontend/CMS]
    B --> C[Backend API]
    C --> D{База данных / Внешние сервисы}
    D --> C
    C --> B
    B --> A
```

---

## Примечания

- Для работы требуется **Node.js** (рекомендуется LTS-версия).
- Все настройки — в `.env.local` или `.env` в каждом пакете.
- Для запуска всех сервисов одновременно можно использовать **Docker Compose** (`slavalarionov-cms/docker-compose.yml`).

---
