let productsArr = [];

fetch('./store.json')
  .then((res) => res.json())
  .then(function (data) {
    productsArr = data.products;
    let productsArea = [];
    let cart = [];
    //~~~~~~~~~
    //초기화면
    //~~~~~~~~~

    //상품데이터받아와서
    productsArr.forEach((data, i) => {
      let 템플릿 = `<div class="products-card" data-id="{productsArr[${i}].id}">
      <img src="./pr${i + 1}.JPG" alt="" class="card-img" />
      <h3 class="products-name">${productsArr[i].title}</h3>
      <p class="products-brand">${productsArr[i].brand}</p>
      <p class="products-price">가격 : ${productsArr[i].price}</p>
      <button class="black-btn">담기</button>
    </div>`;
      //상품영역(products-area) 안에 넣어주셈
      document
        .querySelector('.products-area')
        .insertAdjacentHTML('beforeend', 템플릿);
      //상품영역에 들어있는상품데이터
      productsArea.push(productsArr[i]);
    });
  })

  .catch(function (error) {
    console.log('실패함');
  });

//~~~~~~~~~~
//검색기능
//~~~~~~~~~~

//input이벤트가 일어날 때
document.querySelector('.search-input').addEventListener('input', function () {
  //유저가 입력한 값을 받아옴
  let inputValue = document.querySelector('.search-input').value;
  //상품영역에 들어있는 상품데이터 비움
  productsArea = [];
  document.querySelector('.products-area').innerHTML = '';
  //유저가 검색어입력안함
  if (inputValue === '') {
    productsArr.forEach((data, i) => {
      addCard(i);
      productsArea.push(productsArr[i]);
      //상품영역 안에 들어있는 상품데이터
    });
  }
  //유저가 검색어입력함
  else {
    productsArr.forEach((data, i) => {
      //상품의 제목,브랜드가 검색어를 포함하면
      if (
        productsArr[i].title.includes(inputValue) ||
        productsArr[i].brand.includes(inputValue)
      ) {
        //그 상품만 나오게 html변경
        addCard(i);
        //상품영역 안에 들어있는 상품들 업데이트
        productsArea.push(productsArr[i]);
      }
    });
  }
});
//~~~~~~~~
//함수선언
//~~~~~~~~

//- 상품영역에 카드 추가 -
function addCard(index) {
  let 템플릿 = `<div class="products-card" data-id="{productsArr[${index}].id}">
                <img src="./pr${index + 1}.JPG" alt="" class="card-img" />
                <h3 class="products-name">${productsArr[index].title}</h3>
                <p class="products-brand">${productsArr[index].brand}</p>
                <p class="products-price">가격 : ${productsArr[index].price}</p>
                <button class="black-btn">담기</button>
              </div>`;
  document
    .querySelector('.products-area')
    .insertAdjacentHTML('beforeend', 템플릿);
}
