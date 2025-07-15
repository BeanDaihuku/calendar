document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthEl = document.getElementById('currentMonth');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentDate = new Date();

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // 月と年の表示
        currentMonthEl.textContent = `${year}年 ${month + 1}月`;

        // カレンダーグリッドをクリア
        calendarGrid.innerHTML = '';

        // 今月の最初の日と最終日を取得
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        
        const firstDayOfWeek = firstDayOfMonth.getDay(); // 曜日 (0=日, 6=土)
        const totalDays = lastDayOfMonth.getDate();

        // 前月の余白セルを生成
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('day', 'prev-month');
            calendarGrid.appendChild(emptyDay);
        }

        // 今月の日付セルを生成
        for (let day = 1; day <= totalDays; day++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('day');
            dayEl.innerHTML = `<span class="day-number">${day}</span>`;
            dayEl.dataset.date = `${year}-${month + 1}-${day}`;
            
            // クリックイベントを追加
            dayEl.addEventListener('click', () => {
                addBathTime(dayEl);
            });

            calendarGrid.appendChild(dayEl);
        }
    };

    const addBathTime = (dayElement) => {
        // すでに予定があるかチェック
        if (dayElement.querySelector('.bath-time')) {
            // 予定を削除
            dayElement.querySelector('.bath-time').remove();
        } else {
            // 予定を追加
            const bathTimeEl = document.createElement('div');
            bathTimeEl.classList.add('bath-time');
            // ここでは時間を固定値で表示
            bathTimeEl.textContent = 'お風呂'; 
            dayElement.appendChild(bathTimeEl);
        }
    };

    // 前月へ
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    // 次月へ
    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // 初回表示
    renderCalendar();
});