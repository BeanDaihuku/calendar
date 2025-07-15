document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthEl = document.getElementById('currentMonth');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // 設定パネル関連の要素
    const weeklyInputs = document.querySelectorAll('#weeklySettings input[type="time"]');
    const cancelSection = document.getElementById('cancel-section');
    const selectedDateInfo = document.getElementById('selected-date-info');
    const cancelBtn = document.getElementById('cancelBtn');

    let currentDate = new Date();
    
    // 曜日ごとの時間設定を保存するオブジェクト（曜日番号:時間）
    const weeklyBathTimes = {
        0: '20:00', // 日
        1: '19:00', // 月
        2: '19:00', // 火
        3: '19:00', // 水
        4: '19:00', // 木
        5: '19:00', // 金
        6: '20:00'  // 土
    };

    // 特定の日をキャンセルするためのオブジェクト
    const cancellations = {};

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        currentMonthEl.textContent = `${year}年 ${month + 1}月`;
        calendarGrid.innerHTML = '';

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        
        const firstDayOfWeek = firstDayOfMonth.getDay();
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
            
            const date = new Date(year, month, day);
            const dayOfWeek = date.getDay(); // 曜日を取得
            const dateKey = `${year}-${month + 1}-${day}`;
            dayEl.dataset.date = dateKey;
            dayEl.dataset.dayOfWeek = dayOfWeek;
            
            // 予定の表示ロジック
            if (cancellations[dateKey]) {
                // キャンセルされた日は表示しない
            } else if (weeklyBathTimes[dayOfWeek]) {
                const bathTimeEl = document.createElement('div');
                bathTimeEl.classList.add('bath-time');
                bathTimeEl.textContent = weeklyBathTimes[dayOfWeek];
                dayEl.appendChild(bathTimeEl);
            }

            dayEl.addEventListener('click', () => {
                selectDay(dayEl);
            });

            calendarGrid.appendChild(dayEl);
        }
    };
    
    const selectDay = (dayElement) => {
        // 選択状態の解除
        document.querySelectorAll('.day').forEach(el => el.classList.remove('selected'));
        // 選択状態の追加
        dayElement.classList.add('selected');
        
        const dateKey = dayElement.dataset.date;
        selectedDateInfo.textContent = `${dateKey}の予定`;
        
        // 特定日のキャンセルボタンを表示
        cancelSection.style.display = 'flex';
        
        // ボタンのイベントを再定義
        cancelBtn.onclick = () => {
            if (cancellations[dateKey]) {
                // すでにキャンセル済みなら、キャンセルを解除
                delete cancellations[dateKey];
            } else {
                // キャンセル
                cancellations[dateKey] = true;
            }
            renderCalendar();
            cancelSection.style.display = 'none'; // 非表示に戻す
        };
        
        // ボタンのテキストを切り替える
        if (cancellations[dateKey]) {
            cancelBtn.textContent = '予定を元に戻す';
            cancelBtn.classList.add('restore-button');
        } else {
            cancelBtn.textContent = 'この日の予定をキャンセル';
            cancelBtn.classList.remove('restore-button');
        }
    };

    // 曜日ごとの設定が変更されたらカレンダーを再描画
    weeklyInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const dayOfWeek = e.target.dataset.day;
            weeklyBathTimes[dayOfWeek] = e.target.value;
            renderCalendar();
        });
    });

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
