# Rick and Morty Characters

![Version](https://img.shields.io/github/v/tag/vadlrid/r_and_m)

React-приложение для просмотра персонажей вселенной Rick and Morty. 

Ссылка на приложение https://vadlrid.github.io/r_and_m/

Данные загружаются из публичного [Rick and Morty API](https://rickandmortyapi.com/).

## Возможности

- список персонажей с бесконечной подгрузкой;
- фильтрация по имени, виду, полу и статусу;
- отдельная страница с подробной информацией о персонаже;
- локальное редактирование данных в карточке персонажа;
- сохранение позиции скролла при переходе из списка в карточку и обратно;
- обработка ошибок запросов и страница `404`.

## Технологии

- React 19
- TypeScript
- Vite
- React Router
- Axios
- Formik + Yup
- SCSS
- ESLint, Stylelint, Prettier, Husky, lint-staged

## Требования

- Node.js
- npm

Версии зависимостей зафиксированы в `package-lock.json`, поэтому для установки лучше использовать `npm ci`.

## Запуск

```bash
npm ci
npm run dev
```

После запуска Vite выведет локальный адрес приложения в терминал.

## Скрипты

```bash
npm run dev
```

Запускает dev-сервер Vite.

```bash
npm run build
```

Проверяет TypeScript-проект и собирает production-бандл.

```bash
npm run analyze 
```

Собирает production-бандл и анализирует его при помощи плагина `vite-bundle-analyzer`

```bash
npm run preview
```

Запускает локальный preview production-сборки.

```bash
npm run lint:code
```

Запускает проверки для staged-файлов через `lint-staged`.

```bash
npm run lint:styles
```

Проверяет SCSS-файлы через Stylelint.

```bash
npm run format
```

Форматирует staged-файлы через `pretty-quick`.

## Структура проекта

```text
src/
  assets/          статические изображения и SVG-иконки
  components/      переиспользуемые UI-компоненты
  pages/           страницы списка, карточки персонажа и 404
  shared/          API-хуки, доменные типы, утилиты и общие хуки
  widgets/         составные виджеты: фильтр и карточка персонажа
```

## API

Базовый URL API задан в `src/config.ts`:

```ts
export const API_BASE_URL = 'https://rickandmortyapi.com/api';
```

Запросы выполняются через общий `ApiProvider` и хук `useRequest`. Для запросов настроены повторные попытки через `REQUEST_ATTEMPTS`.

Локальное описание API лежит в `docs/`:

- `docs/R_and_M_API.md`
- `docs/swagger.yaml`

## Маршруты

- `/` - список персонажей;
- `/info/:cid` - подробная информация о персонаже;
- `*` - страница `404`.

В production-сборке приложение использует base path `/r_and_m/`, что настроено в `vite.config.ts`. Файл `public/404.html` нужен для корректной обработки прямых переходов по маршрутам на статическом хостинге.
