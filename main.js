const largeCity = document.getElementById('largeCity');
const middleCity = document.getElementById('middleCity');

document.getElementById('largeCity').addEventListener('change', function () {
  const cityData = new Data('/selectLargeCity', largeCity.value);
  const requestParam = new RequestParam('POST', JSON.stringify(cityData.data));
  const cityType = 'largeCity';
  myFunc(cityData, requestParam, cityType);
});
document.getElementById('middleCity').addEventListener('change', function () {
  const cityData = new Data('/selectMiddleCity', middleCity.value);
  const requestParam = new RequestParam('POST', JSON.stringify(cityData.data));
  const cityType = 'middleCity';
  myFunc(cityData, requestParam, cityType);
});

function Data(url, data) {
  this.url = url;
  this.data = { code: data };
}
function RequestParam(method, body) {
  this.method = method;
  this.headers = { 'Content-Type': 'application/json' };
  this.body = body;
}
function myFunc(cityData, requestParam, cityType) {
  fetch(cityData.url, requestParam)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('POST 요청 성공:', data);
      inputData(data, cityType);
    })
    .catch((error) => {
      console.error('에러 발생:', error);
    });
}
function inputData(data, cityType) {
  if (cityType == 'largeCity') {
    document.querySelectorAll(
      '.gun'
    )[0].innerHTML = `<option value="" disabled selected>시/군/구</option>`;
    for (let i = 0; i < data.length; i++) {
      document.querySelectorAll(
        '.gun'
      )[0].innerHTML += `<option value="${data[i]['code']}">${data[i]['name']}</option>`;
    }
  } else if (cityType == 'middleCity') {
    document.querySelectorAll(
      '.dong'
    )[0].innerHTML = `<option value="" disabled selected>읍/면/동</option>`;
    for (let i = 0; i < data.length; i++) {
      document.querySelectorAll(
        '.dong'
      )[0].innerHTML += `<option value="${data[i]['code']}">${data[i]['name']}</option>`;
    }
  }
}
