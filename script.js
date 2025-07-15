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

.calendar-container {
    width: 90%;
    max-width: 800px;
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
    aspect-ratio: 1 / 1; /* 正方形にする */
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

/* ポップアップのスタイル */
.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fefefe;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 400px;
    position: relative;
    text-align: center;
}

.close-button {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close-button:hover {
    color: black;
}

.modal-content h3 {
    margin-top: 0;
}

.modal-content input {
    margin: 10px 0;
    padding: 8px;
    width: 80%;
}

.modal-content button {
    padding: 10px 20px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#saveTimeBtn {
    background-color: #64b5f6;
    color: white;
}

#deleteTimeBtn {
    background-color: #e57373;
    color: white;
}
