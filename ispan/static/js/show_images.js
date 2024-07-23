let imageData = [];

function updatePage(index) {
    const displayedImage = document.getElementById('displayedImage');
    displayedImage.src = `${imageData[index]}`;
    currentPageIndex = index + 1;
    document.getElementById("currentPages").innerText = `目前頁數：${currentPageIndex}`;

}

fetch('/images_path', {
    method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
            // 儲存圖片資料為全局變數
            imageData = data.images;

            document.getElementById("totalPages").innerText = `/總頁數：${imageData.length}`;
            
            let displayedImage = document.getElementById('displayedImage');
            displayedImage.src = `${data.images[data.images.length - 1]}`;
            currentPageIndex = data.images.length - 1;
            document.getElementById("currentPages").innerText = `目前頁數：${currentPageIndex}`;

        }
    )

// 添加上下頁和輸入頁數的事件
document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPageIndex > 1) {
        updatePage(currentPageIndex - 2);
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPageIndex < imageData.length) {
        updatePage(currentPageIndex);
    }
});

document.getElementById("pageInput").addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        const inputIndex = parseInt(event.target.value, 10) - 1;
        if (inputIndex >= 0 && inputIndex < imageData.length) {
            updatePage(inputIndex);
        } else {
            alert("請輸入有效的頁數");
        }
    }
});

document.getElementById("confirmPage").addEventListener("click", () => {
    const inputElement = document.getElementById("pageInput");
    const inputIndex = parseInt(inputElement.value, 10) - 1;
    if (inputIndex >= 0 && inputIndex < imageData.length) {
        updatePage(inputIndex);
    } else {
        alert("請輸入有效的頁數");
    }
});

function navigateToPage(pageNumber) {
    updatePage(pageNumber-1);
}
