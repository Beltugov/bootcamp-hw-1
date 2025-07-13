## Запуск

### back

````bash
  $ cd back
  $ docker compose up -d
````

#### Local: http://localhost:3000

#### Пример работы

#### Методы Get

Без параметров:

URL `http://localhost:3000/dog`

С помощью Query Params задаём page (perPage = 20, добавлять отдельно возможность изменения не стал)

URL `http://localhost:3000/dog?page=1`

Поиск по id:

URL `http://localhost:3000/dog/:id`

#### Метод Patch

Добавить лайк:

URL `http://localhost:3000/dog/:id`

### front

````bash
  $ cd front
  $ npm install
  $ npm run dev
````

#### Local: http://localhost:5173