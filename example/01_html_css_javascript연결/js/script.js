let count = 0


const numberDisplay = document.getElementById('number');
const increaseBtn = document.getElementById("increaseBtn");

increaseBtn.addEventListener('click', function () {
    count = count + 1;
    numberDisplay.textContent = count;

    console.log("현재 숫자: ",count);
});