function actionInPlace() {
  mainButton.addEventListener('click', action('main button click', (e) => {
    console.log('button have been clicked');
  }));

  let output = document.querySelector('.output');
  when('main button click', (e) => {
    output.textContent = +output.textContent + 1;
  }, 0); // order position of callback
}

function actionJustLabel() {
  mainButton.addEventListener('click', action('main button click'));

  let output = document.querySelector('.output');
  when('main button click', (e) => {
    output.textContent = +output.textContent + 1;
  });
}

function fewActions() {
  mainButton.addEventListener('click', action('main button click'));
  otherButton.addEventListener('click', action('other button click'));

  let output = document.querySelector('.output');
  when('other button click', e => {
    alert('Эй!!! \nПопоросили же на другую нажать. \nЛадно, и тут сделаем...');
  });
  when(['main button click', 'other button click'], (e) => {
    console.log('increment');
    output.textContent = +output.textContent + 1;
  });
}

//actionInPlace();
//actionJustLabel();
fewActions();
