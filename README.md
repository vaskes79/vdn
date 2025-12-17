# Video Notes

[![Netlify Status](https://api.netlify.com/api/v1/badges/70bc7fe7-cb87-460e-8b93-1ccc8f48277f/deploy-status)](https://app.netlify.com/sites/vdn/deploys)

Одностраничное приложение для просмотра видео с YouTube и Vimeo с возможностью создания заметок с временными метками. Все данные хранятся локально в браузере с использованием IndexedDB.

[Демо приложения](https://vdn.netlify.com)

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
yarn start
```

или

```bash
npm start
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

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
- [Material-UI](https://material-ui.com) - компоненты интерфейса
- [react-player](https://github.com/cookpete/react-player) - проигрыватель видео
- [idb](https://github.com/jakearchibald/idb) - работа с IndexedDB

## Документация

Вся документация проекта находится в директории [`docs/`](docs/).

### Основные разделы

- [Правила проекта](docs/project-rules.md) - правила работы с документацией и структурой проекта
- [Архитектура](docs/architecture.md) - описание архитектуры приложения, компонентов, работы с БД и потоков данных

### Пользовательские истории

Описание способов взаимодействия пользователей с приложением:

- [Добавление видео](docs/userstorys/add-video.md) - добавление нового видео в приложение
- [Создание заметки](docs/userstorys/create-note.md) - создание заметки с временной меткой
- [Управление заметками](docs/userstorys/manage-notes.md) - редактирование и удаление заметок
- [Экспорт заметок](docs/userstorys/export-notes.md) - экспорт заметок в разных форматах (HTML, Markdown, Text)
- [Навигация между видео](docs/userstorys/navigate-videos.md) - переключение между видео и управление списком видео
