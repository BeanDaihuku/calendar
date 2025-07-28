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

    // Node-REDのURLを設定します
// [Node-REDのIPアドレス]をあなたの環境に合わせて変更してください
const nodeRedUrl = 'http://localhost:1880/bath-time';

// 今日の日付を取得し、曜日と日付キーを生成する関数
const getTodayData = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const dayOfWeek = today.getDay(); // 曜日 (0=日, 1=月, ...)
    const dateKey = `${year}-${month}-${day}`;
    return { dateKey, dayOfWeek };
};

// Node-REDにデータを送信する関数
const sendDataToNodeRed = () => {
    const { dateKey, dayOfWeek } = getTodayData();
    let bathTime = null;

    // 特定の日にキャンセル設定があるかチェック
    if (cancellations[dateKey]) {
        // キャンセルされている場合は、何も送信せずに終了
        console.log(`今日の予定はキャンセルされています: ${dateKey}`);
        return; 
    }

    // 曜日ごとの設定から今日の時間を取得
    if (weeklyBathTimes[dayOfWeek]) {
        bathTime = weeklyBathTimes[dayOfWeek];
    }

    if (bathTime) {
        const data = {
            date: dateKey,
            time: bathTime
        };

        // Node-REDにデータを送信
        fetch(nodeRedUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                console.log('Node-REDにデータを送信しました:', data);
            } else {
                console.error('Node-REDへのデータ送信に失敗しました:', response.statusText);
            }
        })
        .catch(error => {
            console.error('通信エラー:', error);
        });
    } else {
        console.log('今日の入浴時間は設定されていません。');
    }
};

// ページの読み込みが完了したらデータを送信
window.onload = sendDataToNodeRed;

// ... 既存のコード ...

// CSV書き出しボタンを追加する例 (index.htmlにもボタン要素を追加する必要があります)
const exportCsvBtn = document.getElementById('exportCsvBtn'); // 仮にexportCsvBtnというIDのボタンがあるとします

if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "日付,時刻,キャンセル\n"; // ヘッダー行

        // 週ごとの設定を基にしたデータ
        for (const dayOfWeek in weeklyBathTimes) {
            const time = weeklyBathTimes[dayOfWeek];
            const dayName = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
            csvContent += `${dayName},${time},\n`; // 週ごとの設定はキャンセルなし
        }

        // 特定日のキャンセル情報を追加
        for (const dateKey in cancellations) {
            if (cancellations[dateKey]) {
                csvContent += `${dateKey},,キャンセル\n`; // 日付とキャンセル情報
            }
        }
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "bath_time_schedule.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

});
