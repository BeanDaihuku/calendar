body {
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    background-color: #f0f2f5;
}

h1 {
    color: #333;
}

.main-container {
    display: flex;
    gap: 30px;
    width: 90%;
    max-width: 1200px;
}

.settings-panel {
    flex-shrink: 0;
    width: 300px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    height: fit-content;
}

.weekly-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.weekly-item label {
    font-weight: bold;
}

.weekly-item input {
    padding: 5px;
}

#cancel-section {
    margin-top: 30px;
    border-top: 1px solid #ddd;
    padding-top: 20px;
    display: none; /* 初期状態では非表示 */
    flex-direction: column;
    align-items: center;
}

#selected-date-info {
    font-size: 1.1rem;
    color: #555;
}

.cancel-button {
    padding: 8px 15px;
    background-color: #e57373;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}

.calendar-container {
    flex-grow: 1;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.header button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #555;
}

.weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: bold;
    color: #777;
    margin-bottom: 10px;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
}

.day {
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
    position: relative;
    user-select: none;
}

.day:hover {
    background-color: #e9e9e9;
}

.day.selected {
    border: 2px solid #64b5f6;
    box-shadow: 0 0 5px rgba(100, 181, 246, 0.5);
}

.day-number {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
}

.bath-time {
    background-color: #64b5f6;
    color: white;
    padding: 2px 6px;
    border-radius: 5px;
    font-size: 0.8rem;
    margin-top: 5px;
    position: absolute;
    bottom: 5px;
    left: 5px;
}

.prev-month, .next-month {
    color: #aaa;
}
