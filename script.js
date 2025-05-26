document.addEventListener('DOMContentLoaded', () => {
    const colorBox = document.getElementById('colorBox');
    const colorCode = document.getElementById('colorCode');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');

    // 生成隨機顏色
    function generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // 更新顏色顯示
    function updateColor() {
        const newColor = generateRandomColor();
        colorBox.style.backgroundColor = newColor;
        colorCode.textContent = newColor;
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
    colorBox.addEventListener('click', updateColor);

    // 初始生成一個顏色
    updateColor();
});