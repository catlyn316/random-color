document.addEventListener('DOMContentLoaded', () => {
    const colorBox = document.getElementById('colorBox');
    const colorCode = document.getElementById('colorCode');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const colorHistory = document.getElementById('colorHistory');
    
    // 存儲最多10個顏色
    const MAX_HISTORY = 10;
    let colorHistoryList = [];

    // 從 localStorage 讀取歷史記錄
    function loadHistory() {
        const savedHistory = localStorage.getItem('colorHistory');
        if (savedHistory) {
            colorHistoryList = JSON.parse(savedHistory);
            updateHistoryDisplay();
        }
    }

    // 生成隨機顏色
    function generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }    // 更新歷史記錄顯示
    function updateHistoryDisplay() {
        colorHistory.innerHTML = '';
        colorHistoryList.forEach((color, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.style.backgroundColor = color;
            historyItem.setAttribute('data-color', color);
            historyItem.addEventListener('click', () => {
                colorBox.style.backgroundColor = color;
                colorCode.textContent = color;
            });
            colorHistory.appendChild(historyItem);
        });
        // 保存到 localStorage
        localStorage.setItem('colorHistory', JSON.stringify(colorHistoryList));
    }

    // 更新顏色顯示
    function updateColor() {
        const newColor = generateRandomColor();
        colorBox.style.backgroundColor = newColor;
        colorCode.textContent = newColor;
        
        // 添加到歷史記錄
        if (!colorHistoryList.includes(newColor)) {
            colorHistoryList.unshift(newColor);
            if (colorHistoryList.length > MAX_HISTORY) {
                colorHistoryList.pop();
            }
            updateHistoryDisplay();
        }
    }

    // 複製顏色代碼
    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(colorCode.textContent);
            copyBtn.textContent = '已複製！';
            setTimeout(() => {
                copyBtn.textContent = '複製顏色代碼';
            }, 1500);
        } catch (err) {
            console.error('複製失敗:', err);
        }
    }

    // 添加事件監聽器
    generateBtn.addEventListener('click', updateColor);
    copyBtn.addEventListener('click', copyToClipboard);
    colorBox.addEventListener('click', updateColor);    // 載入歷史記錄並初始生成一個顏色
    loadHistory();
    updateColor();
});