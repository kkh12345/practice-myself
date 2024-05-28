//<<<<<<<<<<<<<<<<<<<<<<<<<<<<전역변수선언영역>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
let productsArr = [];
let inputTag = document.querySelectorAll('.search-input')[0];
let inputValue;
let productsArea = document.querySelector('.products-area');
let currentProducts = [];
firstLoad();

inputTag.addEventListener('input', function () {
  includeArr = [];
  inputValue = inputTag.value;
  resetProducts();
  if (inputValue === '') {
    firstLoad();
  }
  //빈배열아니고, 일치하는 제목 브랜드명 없을 때
  //예) 식ㅅㅍ
  //  그냥 초기상태로.. 안해도 되는데 해보자
  // else {
  //   let includes = false;
  //   for (let i = 0; i < productsArr.length; i++) {
  //     if (
  //       productsArr[i].title.includes(inputValue) ||
  //       productsArr[i].brand.includes(inputValue)
  //     ) {
  //       includes = true;
  //     }
  //   }
  //   if (includes === false) {
  //     firstLoad();
  //   }
  // }

  //(유효성검사완료)

  for (let i = 0; i < productsArr.length; i++) {
    if (
      productsArr[i].title.includes(inputValue) ||
      productsArr[i].brand.includes(inputValue)
    ) {
      includeArr.push(productsArr[i]);
      addCard(i);
    }
    includeArr.forEach(function (data, i) {
      highlight('title', i);
      highlight('brand', i);
    });
  }
  currentProducts = includeArr;
});

document.querySelector('.main').addEventListener('dragstart', function (e) {
  const copyHtml = e.target.innerHTML;
  e.dataTransfer.setData('card', copyHtml);
});

document.querySelector('.main').addEventListener('dragover', function (e) {
  e.preventDefault();
});
document.querySelector('.main').addEventListener('drop', function (e) {
  if (e.target === document.querySelector('.cart-drag')) {
    e.preventDefault();
    const card = e.dataTransfer.getData('card');
    console.log(card);
    // document.querySelectorAll('.products-card')[0].innerHTML = '';
    document.querySelector('.cart-drag-container').innerHTML = '';
    document
      .querySelector('.cart-drag-container')
      .insertAdjacentHTML('beforeend', card);
  }
  // else {
  //   console.log('false');
  // }
});

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<함수선언영역>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

//(처음제품로드화면)
async function firstLoad() {
  await fetch('./store.json')
    .then((res) => res.json())
    .then(function (data) {
      productsArr = data.products;
      currentProducts = productsArr;
      resetProducts();
      productsArr.forEach(function (data, i) {
        addCard(i);
      });
    })
    .catch(function (error) {
      console.log('실패함');
    });
}

//(하이라이트 주기)
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

//(리셋하면 처음제품로드화면으로)
function resetProducts() {
  productsArea.innerHTML = '';
}

//(카드 추가)
function addCard(index) {
  let 템플릿 = `<div class="products-card" draggable="true">
        <div class="card-container">
          <img src="./pr${index + 1}.JPG" alt="" width="100%" />
          <h2 class="card-title">${productsArr[index].title}</h2>
          <p class="card-brand">${productsArr[index].brand}</p>
          <p class="card-price">가격 : ${productsArr[index].price}</p>
          <button class="card-btn">담기</button>
        </div>
      </div>`;
  productsArea.insertAdjacentHTML('beforeend', 템플릿);
}
