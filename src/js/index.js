const $showResultButton = document.querySelector(".open-result-modal-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");
const $lottoNumbersToggleButton = document.querySelector(
  ".lotto-numbers-toggle-button"
);
const $lottoNumbersSection = document.getElementById("lotto-numbers-section");
const $lottoNumbersWrap = document.getElementById("lotto-numbers-wrap");
const $lottoStore = document.getElementById("lotto-store");
const $btnBuyLotto = $lottoStore.querySelector("button");
const $inputPay = $lottoStore.querySelector("input");
const $quantity = document.getElementById("quantity");

const lottoList = [];

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

const onToggleLottoNumbers = () => {
  $lottoNumbersWrap.classList.toggle("flex-col");
};

const randomNumber = () => {
  return Math.floor(Math.random() * 45) + 1;
};

const newLotto = (array = []) => {
  if (array.length === 6) {
    return array;
  }

  const num = randomNumber();
  if (array.includes(num) === false) {
    array.push(num);
  }

  return newLotto(array);
};

const displayLottoList = (lottoList) => {
  $quantity.innerText = lottoList.length;

  const html = lottoList.reduce((html, lotto) => {
    html += `<div class="mx-1 text-4xl">🎟️ <span class="text-2xl lotto-numbers">${lotto.join(
      ", "
    )}</span></div>`;
    return html;
  }, "");

  $lottoNumbersWrap.innerHTML = html;
  showLottoList();
};

const showLottoList = () => {
  $lottoNumbersSection.classList.remove("d-none");
};

const hideLottoList = () => {
  $lottoNumbersSection.classList.add("d-none");
};

const buyLotto = (e) => {
  e.preventDefault();
  const pay = $inputPay.value;
  if (pay % 1000 !== 0) {
    alert("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
  }

  const needLottoNum = pay / 1000;

  for (let i = 0; i < needLottoNum; i++) {
    lottoList.push(newLotto());
  }

  displayLottoList(lottoList);
  e.target.disabled = true;
};

const reset = () => {
  $quantity.innerText = "";
  $lottoNumbersWrap.innerHTML = "";
  $btnBuyLotto.disabled = false;
  hideLottoList();
};

const init = () => {
  $showResultButton.addEventListener("click", onModalShow);
  $modalClose.addEventListener("click", onModalClose);
  $lottoNumbersToggleButton.addEventListener("click", onToggleLottoNumbers);
  $btnBuyLotto.addEventListener("click", buyLotto);
  reset();
};

init();
