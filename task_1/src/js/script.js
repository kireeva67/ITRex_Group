var container = document.querySelector('.container');

fetch('https://www.nbrb.by/api/exrates/rates?periodicity=0')
  .then((response) => {
    return response.text();
  })
  .then(createElementsFromData);

function createElementsFromData(file) {
  let data = JSON.parse(file);
  for (let ch = 0; ch < data.length; ch++) {
    var containerRow = document.createElement('div');
    containerRow.classList.add('container__row');
    container.appendChild(containerRow);
    containerRow.classList.add(`.container__row_${ch}`);

    let name = data[ch]['Cur_Name'];
    addTag(name, containerRow);

    let abbreviation = data[ch]['Cur_Abbreviation'];
    let scale = data[ch]['Cur_Scale'];
    addTag(`${scale} ${abbreviation}`, containerRow);

    let rate = data[ch]['Cur_OfficialRate'];
    addTag(rate, containerRow);
  }
}

function addTag(tag, containerRow) {
  let tagFor = document.createElement('div');
  tagFor.innerText = tag;
  tagFor.classList.add('row');
  containerRow.appendChild(tagFor);
  return tagFor;
}
