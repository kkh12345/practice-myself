//get요청 상품데이터 가져와서 card 템플릿만든후
//products-area안에 넣으셈

//~~~~~~~~
//get요청
//~~~~~~~~
let productsArr, searchArr, inputValue;
let cartArr = [];
let productsArea = document.querySelector('.products-area');
let cartBlack = document.querySelector('.cart-black');
fetch('./store.json')
  .then((res) => res.json())
  .then(function (data) {
    productsArr = data.products;
    console.log(productsArr);
    addProductsAreaCard(productsArr);
  })
  .catch(function (error) {
    console.log('fail');
  });

//~~~~~~~~
//검색기능
//~~~~~~~~
//검색창에 input이벤트일어남
//제목 브랜드가 검색어를 포함하는 카드 찾아서 배열에 담기
//근데 중복된거 있으면 수량만 추가할거임
//products-area 비우기
//products-area 에 새로운 배열 for문돌리면서 html넣기

document.querySelector('.search-input').addEventListener('input', function (e) {
  inputValue = e.target.value;
  searchArr = productsArr.filter(
    (a) => a.title.includes(inputValue) || a.brand.includes(inputValue)
  );
  nullHtml('.products-area');
  addProductsAreaCard(searchArr);
  //하이라이트
  //searchArr 반목문돌려서
  //title,brand가 검색어와 겹치는 부분을
  //span태그씌워서 replace

  highlight('title');
  highlight('brand');
});

//드래그&드롭
//productsArea의 상품을 드래그시작하여
//(e.target.dataset.id)랑 같은
//(productsArr for문돌려서 id찾기)찾아서 cart-black에 담음
//cart-black 에 드롭 이벤트가 일어나면
//그 상품을 cartArr에 담음

//(cartArr을 만들어서 그 상품데이터를 담자)
//카드안의 버튼 대신 수량표시해주는 input넣음

productsArea.addEventListener('dragstart', (e) => {
  let setId = e.target.dataset.id;
  e.dataTransfer.setData('setID', setId);
});
cartBlack.addEventListener('dragover', (e) => {
  e.preventDefault();
});
cartBlack.addEventListener('drop', (e) => {
  let getId = e.dataTransfer.getData('setID');
  nullHtml('.cart-black');
  productsArr.forEach(function (a, i) {
    if (a.id == getId) {
      cartArr.push(a);
      addCartAreaCard();
    }
  });
});

//~~~~~~~~
//함수영역
//~~~~~~~~

//cart-black에 카드 넣기
function addCartAreaCard() {
  cartArr.forEach(function (a, i) {
    let 템플릿 = ` <div class="card" data-id="${a.id}" draggable="true">
<img src=${a.photo} alt="" class="card-img" />
<h4 class="card-title">${a.title}</h4>
<p class="card-brand">${a.brand}</p>
<p class="card-price">가격 : ${a.price}</p>
<input type="number" value="1" style="width: 100%";>
</div>`;
    cartBlack.insertAdjacentHTML('beforeend', 템플릿);
  });
}
//productsArea에 카드 넣기

function addProductsAreaCard(arr) {
  arr.forEach(function (a, i) {
    let 템플릿 = ` <div class="card" data-id="${a.id}" draggable="true">
    <img src=${a.photo} alt="" class="card-img" />
    <h4 class="card-title">${a.title}</h4>
    <p class="card-brand">${a.brand}</p>
    <p class="card-price">가격 : ${a.price}</p>
    <button class="add-btn">담기</button>
  </div>`;
    productsArea.insertAdjacentHTML('beforeend', 템플릿);
  });
}

//productsArea html비우기
function nullHtml(selector) {
  document.querySelector(selector).innerHTML = '';
}

//productsArea검색 하이라이트
function highlight(content) {
  searchArr.forEach(function (a, i) {
    if (a[content].includes(inputValue)) {
      let str = a[content];
      let regexp = new RegExp(inputValue, 'g');
      let replaceStr = str.replace(
        inputValue,
        `<span style="background-color:yellow">${inputValue}</span>`
      );
      document.querySelectorAll(`.card-${content}`)[i].innerHTML = replaceStr;
    }
  });
}
