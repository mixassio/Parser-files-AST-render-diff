# Parser files, AST

[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)

[![Build Status](https://travis-ci.org/mixassio/project-lvl2-s237.svg?branch=master)](https://travis-ci.org/mixassio/project-lvl2-s237)

Утилита для поиска отличий в конфигурационных файлах.
Принцип работы:
1. Парсинг файлов разных типов (yml, ini, json)
2. Создание АСТ-дерева и выявление отличий между файлами
3. Рендеринг разницы в различные форматы (дерево, плоская структура, json)

Пример работы

```
$ npm i -g project-mixassio-2
$ gendiff before.json after.json

{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false
}
```
before.json
```
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```
after.json:
```
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```