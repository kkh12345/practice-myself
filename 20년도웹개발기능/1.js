//--------------------전역변수선언영역------------//
let productsArr = [];
let inputTag = document.querySelectorAll('.search-input')[0];
let inputValue;
let productsArea = document.querySelector('.products-area');

firstLoad();

inputTag.addEventListener('input', function () {
  inputValue = inputTag.value;
  let includeArr = [];

  resetProducts();
  if (inputValue === '') {
    resetProducts();
    firstLoad();
  }

  for (let i = 0; i < productsArr.length; i++) {
    if (
      productsArr[i].title.includes(inputValue) ||
      productsArr[i].brand.includes(inputValue)
    ) {
      includeArr.push(productsArr[i]);
      let 템플릿 = `<div class="products-card">
        <div class="card-container">
          <img src="./pr${i + 1}.JPG" alt=""  />
          <h2 class="card-title">${productsArr[i].title}</h2>
          <p class="card-brand">${productsArr[i].brand}</p>
          <p class="card-price">가격 : ${productsArr[i].price}</p>
          <button class="card-btn">담기</button>
        </div>
      </div>`;
      productsArea.insertAdjacentHTML('beforeend', 템플릿);
    }

    includeArr.forEach(function (data, i) {
      highlight('title', i);
      highlight('brand', i);
    });
  }
});

//---------------------함수선언영역-----------------//

//처음제품로드화면
async function firstLoad() {
  await fetch('./store.json')
    .then((res) => res.json())
    .then(function (data) {
      productsArr = data.products;
      resetProducts();
      productsArr.forEach(function (data, i) {
        let 템플릿 = `<div class="products-card">
        <div class="card-container">
          <img src="./pr${i + 1}.JPG" alt="" width="100%" />
          <h2 class="card-title">${productsArr[i].title}</h2>
          <p class="card-brand">${productsArr[i].brand}</p>
          <p class="card-price">가격 : ${productsArr[i].price}</p>
          <button class="card-btn">담기</button>
        </div>
      </div>`;
        productsArea.insertAdjacentHTML('beforeend', 템플릿);
      });
    })
    .catch(function (error) {
      console.log('실패함');
    });
}

//하이라이트 주기
function highlight(content, index) {
  inputValue = inputTag.value;
  let str = document.querySelectorAll(`.card-${content}`)[index].innerText;
  const strFind = inputValue;
  const regex = new RegExp(strFind, 'g');
  const replaceStr = str.replace(
    regex,
    `<span style="background-color:yellow">${strFind}</span>`
  );
  // console.log(replaceStr);
  document.querySelectorAll(`.card-${content}`)[index].innerHTML = replaceStr;
}

//리셋하면 처음제품로드화면으로
function resetProducts() {
  productsArea.innerHTML = '';
}
