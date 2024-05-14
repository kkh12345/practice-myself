const bigCity = document.getElementById('bigCity');
const smallCity = document.getElementById('smallCity');

document.getElementById('bigCity').addEventListener('change', myFunc);
document.getElementById('smallCity').addEventListener('change', myFunc2);

function myFunc() {
  const url = '/selectBigCity';
  let data = {
    first_code: bigCity.value,
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('POST 요청 성공:', data);

      document.querySelectorAll(
        '.gun'
      )[0].innerHTML = `<option value="" disabled selected>군/구</option>
      `;
      for (let i = 0; i < data.length; i++) {
        document.querySelectorAll(
          '.gun'
        )[0].innerHTML += `<option value="${data[i]['code']}">${data[i]['name']}</option>
      `;
      }
    })
    .catch((error) => {
      console.error('에러 발생:', error);
    });
}

function myFunc2() {
  const url = '/selectSmallCity';
  let data = {
    code: smallCity.value,
  };
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('POST 요청 성공:', data);
      document.querySelectorAll(
        '.dong'
      )[0].innerHTML = `<option value="" disabled selected>읍/면/동</option>
      `;
      for (let i = 0; i < data.length; i++) {
        document.querySelectorAll(
          '.dong'
        )[0].innerHTML += `<option value="${data[i]['code']}">${data[i]['name']}</option>
      `;
      }
    })
    .catch((error) => {
      console.error('에러 발생:', error);
    });
}
