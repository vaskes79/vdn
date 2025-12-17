# Обоснование использования интерфейсов в проекте VDN

## Принцип выбора: interface vs type

В проекте VDN используются **интерфейсы (interface)** для всех деклараций типов объектов и структур данных.

## Технические причины

### 1. Совместимость с Dexie.js

Dexie.js библиотека для работы с IndexedDB использует интерфейсы для типизации таблиц:

```typescript
export class VdnDatabase extends Dexie {
  videos!: Table<Video, string>;  // Video должен быть interface
  notes!: Table<Note, number>;
  settings!: Table<Setting, string>;
}
```

Использование интерфейсов обеспечивает:
- Лучшую производительность компилятора TypeScript
- Корректную работу с generic типами `Table<T, K>`
- Совместимость с внутренней типизацией Dexie.js

### 2. Declaration Merging

Интерфейсы поддерживают объединение деклараций (declaration merging), что позволяет расширять типы без изменения исходного кода:

```typescript
// Исходный интерфейс
export interface Video {
  url: string;
  title: string;
}

// В будущем можно расширить без breaking changes
interface Video {
  metadata?: Record<string, unknown>;
  createdAt?: Date;
}
```

Это критично для:
- Плагинов и расширений
- Постепенной миграции
- Добавления опциональных полей

### 3. Семантическая ясность

**Интерфейсы** используются для:
- Объектных структур данных (`Video`, `Note`, `Setting`)
- Контрактов состояний (`VideoStoreState`, `NotesStoreState`)
- Контрактов действий (`VideoStoreActions`, `NotesStoreActions`)

**Типы (type)** были бы уместны для:
- Union типов: `type Status = 'loading' | 'success' | 'error'`
- Intersection типов: `type Combined = A & B`
- Вычисляемых типов: `type Keys = keyof Video`

В проекте все сущности — объектные структуры, поэтому интерфейсы семантически корректны.

### 4. Производительность компилятора

TypeScript компилятор оптимизирован для работы с интерфейсами:
- Быстрее проверяет структурную совместимость
- Эффективнее обрабатывает большие проекты
- Меньше накладных расходов при инкрементальной компиляции

### 5. Архитектурная изоляция слоев

Интерфейсы определяют четкие контракты между слоями архитектуры:

```
UI Layer → Store Interfaces → Services → Database
```

```typescript
// Store интерфейсы - контракт для UI
export interface VideoStoreState {
  currentVideoUrl: string;
  isPlaying: boolean;
  videos: Video[];
}

export interface VideoStoreActions {
  setCurrentVideo: (url: string) => Promise<void>;
  loadVideos: () => Promise<void>;
}
```

**Преимущества:**
- UI зависит только от интерфейсов, не от реализации
- Легко заменить UI слой без изменения бизнес-логики
- Четкое разделение ответственности

### 6. Расширяемость для будущих фич

Интерфейсы позволяют постепенно добавлять функциональность:

```typescript
// Текущая версия
export interface Note {
  id?: number;
  url: string;
  title: string;
  time: number;
}

// Будущее расширение (через declaration merging)
interface Note {
  tags?: string[];
  priority?: number;
  attachments?: string[];
}
```

## Когда использовать type вместо interface

В проекте `type` уместен для:

1. **Union типов:**
```typescript
type ExportFormat = 'html' | 'markdown' | 'text';
type VideoStatus = 'loading' | 'ready' | 'error';
```

2. **Вычисляемых типов:**
```typescript
type VideoKeys = keyof Video;  // 'url' | 'title'
type PartialVideo = Partial<Video>;
```

3. **Intersection типов:**
```typescript
type VideoWithMetadata = Video & { metadata: Record<string, unknown> };
```

## Итоговое правило проекта

**Используем `interface` для:**
- ✅ Объектных структур данных (Video, Note, Setting)
- ✅ Контрактов состояний (StoreState)
- ✅ Контрактов действий (StoreActions)
- ✅ Любых структур, которые могут расширяться

**Используем `type` для:**
- ✅ Union типов
- ✅ Intersection типов
- ✅ Вычисляемых типов
- ✅ Алиасов примитивов

## Ссылки

- [TypeScript Handbook: Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- [TypeScript Handbook: Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
- [Dexie.js TypeScript Guide](https://dexie.org/docs/Typescript)

