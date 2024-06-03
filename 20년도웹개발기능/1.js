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
  let sumPrice = 0;

  //어떤 카드를 드롭했는지
  productsArr.forEach((a, i) => {
    if (getId == a.id) {
      console.log(cartArr);
      if (cartArr.includes(a)) {
        console.log('중복');
        let index = cartArr.indexOf(a);
        document.querySelectorAll('.cart-black input')[index].value++;
        let count = document.querySelectorAll('.cart-black input')[index].value;
        let price = a.price;
        document.querySelectorAll('.cart-black .card-price span')[
          index
        ].innerHTML = count * price;
      } else {
        console.log('중복이 아님');
        document.querySelector('.drag-here').innerHTML = '';
        cartArr.push(a);
        let 템플릿 = ` <div class="card" data-id="${a.id}" draggable="true">
    <img src=${a.photo} alt="" class="card-img" />
    <h4 class="card-title">${a.title}</h4>
    <p class="card-brand">${a.brand}</p>
    <p class="card-price">가격 : <span>${a.price}</span></p>
    <input type="number" style="width : 100%" value=1 data-price="${a.price}">
  </div>`;
        cartBlack.insertAdjacentHTML('beforeend', 템플릿);
      }
    }
    cartBlack.style.alignItems = 'flex-start';
  });
  cartArr.forEach((a, i) => {
    sumPrice += Number(
      document.querySelectorAll('.cart-black .card-price>span')[i].innerHTML
    );
  });
  document.querySelector('.final-price>span').innerHTML = sumPrice;
});

cartBlack.addEventListener('input', (e) => {
  let sumPrice = 0;
  // console.log(e.target.dataset.price);
  // console.log(e.target.dataset.price * e.target.value);
  if (e.target.value <= 0) {
    e.target.value = '';
  } else {
    e.target.previousElementSibling.children[0].innerHTML =
      e.target.dataset.price * e.target.value;
  }
  cartArr.forEach((a, i) => {
    sumPrice += Number(
      document.querySelectorAll('.cart-black .card-price>span')[i].innerHTML
    );
  });
  document.querySelector('.final-price>span').innerHTML = sumPrice;
});

document.querySelector('.products-area').addEventListener('click', (e) => {
  let sumPrice = 0;
  let clickBtn = false;
  let double = false;
  for (i = 0; i < document.querySelectorAll('.add-btn').length; i++) {
    if (e.target == document.querySelectorAll('.add-btn')[i]) {
      clickBtn = true;
    }
  }
  if (clickBtn === true) {
    cartArr.forEach((a, i) => {
      if (a.id == e.target.dataset.id) {
        console.log('중복');
        double = true;
      }
    });
    if (double === true) {
      cartArr.forEach((a, i) => {
        if (e.target.dataset.id == a.id) {
          let index = cartArr.indexOf(a);
          document.querySelectorAll('.cart-black input')[index].value++;
          let count =
            document.querySelectorAll('.cart-black input')[index].value;
          let price = a.price;
          document.querySelectorAll('.cart-black .card-price span')[
            index
          ].innerHTML = count * price;
        }
      });
    } else {
      productsArr.forEach((a, i) => {
        if (e.target.dataset.id == a.id) {
          document.querySelector('.drag-here').innerHTML = '';
          cartArr.push(a);
          let 템플릿 = ` <div class="card" data-id="${a.id}" draggable="true">
    <img src=${a.photo} alt="" class="card-img" />
    <h4 class="card-title">${a.title}</h4>
    <p class="card-brand">${a.brand}</p>
    <p class="card-price">가격 : <span>${a.price}</span></p>
    <input type="number" style="width : 100%" value=1 data-price="${a.price}">
  </div>`;
          cartBlack.insertAdjacentHTML('beforeend', 템플릿);
        }
      });
    }
  }
  cartArr.forEach((a, i) => {
    sumPrice += Number(
      document.querySelectorAll('.cart-black .card-price>span')[i].innerHTML
    );
  });
  document.querySelector('.final-price>span').innerHTML = sumPrice;
});

document.querySelector('.buy-btn').addEventListener('click', () => {
  document.querySelector('.modal').style.display = 'flex';
});

document.querySelector('.exit-btn').addEventListener('click', () => {
  document.querySelector('.modal').style.display = 'none';
});

document.querySelector('.finish-btn').addEventListener('click', () => {
  document.querySelector('#canvas').style.display = 'block';
  // document.querySelector('#canvas').style.zIndex = '10';
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
    <button class="add-btn" data-id="${a.id}">담기</button>
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
