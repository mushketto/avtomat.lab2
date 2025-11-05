# Matrix TDD (Lab 2)

Мета: реалізувати бібліотеку операцій над матрицями з використанням підходу TDD (Mocha + Chai).

## Як запускати
1. `npm install`
2. `npm test` — запуск тестів
3. `npm run coverage` — запуск з nyc (coverage)

## Структура
- `src/matrix.js` — реалізація
- `test/matrix.test.js` — тести (Mocha + Chai)

## Процес TDD (показано в історії комітів)
1. Додати тест (повинен падати) — `git commit -m "TDD: add failing test for matrix.add (red)"`
2. Реалізувати мінімально потрібний код — `git commit -m "TDD: implement matrix.add to pass test (green)"`
3. Рефакторинг та валідація — `git commit -m "TDD: refactor matrix.add, add validation (refactor)"`

