let productsArr = [];

fetch('./store.json')
  .then((res) => res.json())
  .then(function (data) {
    console.log('성공');
    console.log(data.products);
    productsArr = data.products;

    productsArr.forEach(function (data, i) {
      let 템플릿 = `<div class="products-card">
        <div class="card-container">
          <img src="./pr${i + 1}.JPG" alt="" width="100%" />
          <h2 class="card-title">${data.title}</h2>
          <p class="card-brand">${data.brand}</p>
          <p class="card-price">가격 : ${data.price}</p>
          <button class="card-btn">담기</button>
        </div>
      </div>`;
      document
        .querySelectorAll('.products-area')[0]
        .insertAdjacentHTML('beforeend', 템플릿);
    });
  })
  .catch(function (error) {
    console.log('실패함');
  });
