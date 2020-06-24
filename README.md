# EVENTONE - event singletone
### [RU] Это микробиблиотека, которая упрощает работу по связке событий интерфвейса и программной логики.
### [EN] This is microlib, which simplify process of binding UI events with business logic updating.

## API
- `action(label:string [, inPlaceCallback:function]) -> function`
- `when(actionLabel:string | actionLabelArr:string[], reactor:function[, callPlace:int = 0])`


### action

Эта функция создаёт метку события и возвращает функцию. 
Аргументы:
- label:string - отвечает за название метки. - inPlaceCallback:function - не обязательный, отвечает за то что происходит при вызове функции метки.

Покажем на примере:
```js
// Создание метки без действий прямо тут.
element.addEventListener('click', action('element click'));

// Метка создана, к тому же при клике на элемент в консоль будет выведено сообщение.
element.addEventListener('click', action('element click', e => {
  console.log('element is clicked');
}));
```

### when

Эта функция подписывает обработчики на метки.
Аргументы:
- actionLabel:string | actionLabelArr: string[] - может быть строкой или массивом строк. Указывает к каким меткам происходит привязка.
- reactor:function - функция-обработчик обращения к метке.
- callPlace:int - не обязательный, отвечает за позицию вызова обработчика при обращении к метке.  По умолчанию равен 0.<br><br>ПОДРОБНЕЕ про callPlace: Если этот параметр меньше 0, то реактор выполняется раньше *основного обработчика*, присвоенного во время создания метки (функцией action). Если значение этого аргумента больше или равно 0, то реактор выполнится после *основного обработчика*. Обработчики выстраиваются в очередь по этому параметру по тому же принципу - меньшее значение выполняется раньше, а большее - позже.

Рассмотрим работу на примере:
```js
// Создание метки
element.addEventListener('click', action('element click'));

// Где-то на 1000 строк кода дальше
when('element click', e => {
  console.log('Было нажатие на element [сказал подписчик]');
});

/* ВЫВОД:
(Нажали на element)
< 'Было нажатие на element [сказал подписчик]'
*/
```
Теперь посмотрим как функция работает с *основным обработчиком*:
```js
// Создание метки
element.addEventListener('click', action('element click', e => {
  console.log('На меня нажали [сказал element]');
}));

// Где-то на 1000 строк кода дальше
when('element click', e => {
  console.log('Было нажатие на element [сказал подписчик]');
});

/* ВЫВОД:
(Нажали на element)
< 'На меня нажали [сказал element]'
< 'Было нажатие на element [сказал подписчик]'
*/
```
Пример на работу callPlace:
```js
// Создание метки
element.addEventListener('click', action('element click', e => {
  console.log('На меня нажали [сказал element]');
}));

// Где-то на 1000 строк кода дальше
when('element click', e => console.log('Раньше основного: -2'), -2);
when('element click', e => console.log('Раньше основного: -1'), -1);
when('element click', e => console.log('После основного: 0'));
when('element click', e => console.log('После основного: 0'), 0);
when('element click', e => console.log('После основного: 1'), 1);
when('element click', e => console.log('После основного: 2'), 2);

/* ВЫВОД:
(Нажали на element)
< 'Раньше основного: -2'
< 'Раньше основного: -1'
< 'На меня нажали [сказал element]'
< 'После основного:   0'
< 'После основного:   0'
< 'После основного:   1'
< 'После основного:   2'
*/
```
Одновременная обработка нескольких меток:
```js
// Создание метки
element0.addEventListener('click', action('element0 click'));
element1.addEventListener('click', action('element1 click'));

// Где-то на 1000 строк кода дальше
when(
  ['element0 click', 'element1 click'], 
  e => console.log('Нажали на какой-то element')
);

/* ВЫВОД:
(Нажали на element0)
< 'Нажали на какой-то element
(Нажали на element1)
< 'Нажали на какой-то element
*/
```

## Предполагаемое применение
Эта микро-библиотека поможет вам связать программную логику вашего веб-приложения и определить её в удобном для вас месте.

\* Рекомендуется выработать правила названия меток для крупных проектов, чтобы избежать путаницы и пересечения имён меток.