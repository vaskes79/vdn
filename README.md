# Video Notes

[![Netlify Status](https://api.netlify.com/api/v1/badges/70bc7fe7-cb87-460e-8b93-1ccc8f48277f/deploy-status)](https://app.netlify.com/sites/vdn/deploys)

Одностраничное приложение для просмотра видео с YouTube и Vimeo с возможностью создания заметок с временными метками. Все данные хранятся локально в браузере с использованием IndexedDB.

[Демо приложения](https://vnote.ru)

## Быстрый старт

### Установка зависимостей

```bash
yarn install
```

или

```bash
npm install
```

### Запуск в режиме разработки

```bash
yarn dev
```

или

```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:5173](http://localhost:5173)

### Сборка для продакшена

```bash
yarn build
```

или

```bash
npm run build
```

## Технологии

- [React](https://reactjs.org/) - UI библиотека
- [TypeScript](https://www.typescriptlang.org/) - типизация
- [Vite](https://vitejs.dev/) - инструменты сборки
- [react-player](https://github.com/cookpete/react-player) - проигрыватель видео
- [Dexie](https://dexie.org/) - работа с IndexedDB
- [Zustand](https://github.com/pmndrs/zustand) - управление состоянием
- [Radix UI](https://www.radix-ui.com/) - компоненты интерфейса

## Документация

Вся документация проекта находится в директории [`docs/`](docs/).

### Основные разделы

- [Правила проекта](docs/project-rules.md) - правила работы с документацией и структурой проекта
- [Архитектура](docs/architecture.md) - описание архитектуры приложения, компонентов, работы с БД и потоков данных
- [План модернизации](docs/plan-modernization.md) - план модернизации проекта с принципом "Functionality First"
- [Статус модернизации](docs/modernization-status.md) - текущий статус модернизации проекта
- [Обоснование типов](docs/types-design-rationale.md) - обоснование использования интерфейсов вместо type в проекте

### Пользовательские истории

Описание способов взаимодействия пользователей с приложением:

- [Добавление видео](docs/userstorys/add-video.md) - добавление нового видео в приложение
- [Создание заметки](docs/userstorys/create-note.md) - создание заметки с временной меткой
- [Управление заметками](docs/userstorys/manage-notes.md) - редактирование и удаление заметок
- [Экспорт заметок](docs/userstorys/export-notes.md) - экспорт заметок в разных форматах (HTML, Markdown, Text)
- [Навигация между видео](docs/userstorys/navigate-videos.md) - переключение между видео и управление списком видео
