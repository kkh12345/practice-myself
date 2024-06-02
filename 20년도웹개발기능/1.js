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

productsArea.addEventListener('dragstart', (e) => {
  let setId = e.target.dataset.id;

  e.dataTransfer.setData('setID', setId);
});
cartBlack.addEventListener('dragover', (e) => {
  e.preventDefault();
});
cartBlack.addEventListener('drop', (e) => {
  let getId = e.dataTransfer.getData('setID');

  if (cartArr.length === 0) {
    console.log('비었음');

    productsArr.forEach((a, i) => {
      if (getId == a.id) {
        cartArr.push(a);
      }
    });
    console.log(cartArr);
    nullHtml('.cart-black');
    cartArr.forEach((b, i) => {
      let 템플릿 = ` <div class="card" data-id="${b.id}" draggable="true">
  <img src=${b.photo} alt="" class="card-img" />
  <h4 class="card-title">${b.title}</h4>
  <p class="card-brand">${b.brand}</p>
  <p class="card-price">가격 : ${b.price}</p>
  <input type="number", style="width : 100%" value=1 class="count">
</div>`;
      cartBlack.insertAdjacentHTML('beforeend', 템플릿);
    });
  } else {
    console.log('안비었음');
    //중복검사
    cartArr.forEach((a, i) => {
      if (getId == a.id) {
        console.log('중복');
        document.querySelectorAll('.count')[i].setAttribute('value', '2');
      } else {
        console.log('중복이 아님');
        productsArr.forEach((b, i) => {
          if (getId == b.id) {
            cartArr.push(b);
            let 템플릿 = ` <div class="card" data-id="${b.id}" draggable="true">
            <img src=${b.photo} alt="" class="card-img" />
            <h4 class="card-title">${b.title}</h4>
            <p class="card-brand">${b.brand}</p>
            <p class="card-price">가격 : ${b.price}</p>
            <input type="number", style="width : 100%" value=1 class="count">
          </div>`;
            cartBlack.insertAdjacentHTML('beforeend', 템플릿);
          }
        });
      }
    });
  }
});

//~~~~~~~~
//함수영역
//~~~~~~~~

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
