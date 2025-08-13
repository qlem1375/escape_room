document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 가져오기
    const clockArea = document.getElementById('clock-area');
    const computerArea = document.getElementById('computer-area');
    const pencilCaseArea = document.getElementById('pencil-case-area');
    const doorArea = document.getElementById('door-area');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.getElementById('close-button');
    const clueList = document.getElementById('clue-list');

    // 게임 상태 변수
    const solvedPuzzles = {
        clock: false,
        computer: false,
        pencilCase: false
    };
    const clues = {
        clock: "0",
        computer: "5",
        pencilCase: "81"
    };

    // 모달 열기 함수
    const openModal = () => modal.classList.remove('modal-hidden');
    // 모달 닫기 함수
    const closeModal = () => modal.classList.add('modal-hidden');

    // 힌트 업데이트 함수
    const updateClues = (puzzleName) => {
        if (!solvedPuzzles[puzzleName]) {
            solvedPuzzles[puzzleName] = true;
            const li = document.createElement('li');
            li.textContent = `[${puzzleName}] 힌트: ${clues[puzzleName]}`;
            clueList.appendChild(li);
        }
    };
    
    // 모달 닫기 버튼 이벤트
    closeButton.addEventListener('click', closeModal);

    // 1. 시계 게임
    clockArea.addEventListener('click', () => {
        if (solvedPuzzles.clock) {
            alert('이미 해결한 문제입니다.');
            return;
        }
        modalTitle.innerText = '첫 번째 문제: 시계';
        modalBody.innerHTML = `
            <p>이미지에 있는 시계는 몇 시 몇 분을 가리키고 있습니까?</p>
            <p>'HH:MM' 형식으로 입력해주세요. (예: 03:30)</p>
            <input type="text" id="clock-answer" placeholder="HH:MM">
            <button id="clock-submit">확인</button>
        `;
        openModal();

        document.getElementById('clock-submit').addEventListener('click', () => {
            const answer = document.getElementById('clock-answer').value;
            if (answer === '10:10') {
                alert(`정답입니다! 첫 번째 힌트 [${clues.clock}]을(를) 획득했습니다.`);
                updateClues('clock');
                closeModal();
            } else {
                alert('틀렸습니다. 다시 시도해보세요.');
            }
        });
    });

    // 2. 컴퓨터 게임
    computerArea.addEventListener('click', () => {
        if (solvedPuzzles.computer) {
            alert('이미 해결한 문제입니다.');
            return;
        }
        modalTitle.innerText = '두 번째 문제: 컴퓨터';
        modalBody.innerHTML = `
            <p>교실 안에 있는 학생용 책상은 총 몇 개인가요?</p>
            <input type="number" id="computer-answer" placeholder="숫자만 입력">
            <button id="computer-submit">확인</button>
        `;
        openModal();

        document.getElementById('computer-submit').addEventListener('click', () => {
            const answer = document.getElementById('computer-answer').value;
            if (answer === '15') {
                alert(`정답입니다! 두 번째 힌트 [${clues.computer}]을(를) 획득했습니다.`);
                updateClues('computer');
                closeModal();
            } else {
                alert('틀렸습니다. 다시 세어보세요.');
            }
        });
    });

    // 3. 필통 게임
    pencilCaseArea.addEventListener('click', () => {
        if (solvedPuzzles.pencilCase) {
            alert('이미 해결한 문제입니다.');
            return;
        }
        modalTitle.innerText = '세 번째 문제: 필통';
        modalBody.innerHTML = `
            <p>아래 알파벳을 조합하여 만들 수 있는 두 단어는 무엇일까요?</p>
            <p><strong>C I P E N L A S C E</strong></p>
            <p>(띄어쓰기로 구분하여 영어로 입력하세요)</p>
            <input type="text" id="pencil-case-answer" placeholder="OOO OOO">
            <button id="pencil-case-submit">확인</button>
        `;
        openModal();

        document.getElementById('pencil-case-submit').addEventListener('click', () => {
            const answer = document.getElementById('pencil-case-answer').value.toUpperCase();
            if (answer === 'PENCIL CASE') {
                alert(`정답입니다! 세 번째 힌트 [${clues.pencilCase}]을(를) 획득했습니다.`);
                updateClues('pencilCase');
                closeModal();
            } else {
                alert('틀렸습니다. 다시 생각해보세요.');
            }
        });
    });

    // 4. 문 (최종 탈출)
    doorArea.addEventListener('click', () => {
        modalTitle.innerText = '탈출 시도';
        modalBody.innerHTML = `
            <p>문의 잠금을 해제하려면 4자리 비밀번호가 필요합니다.</p>
            <p>지금까지 얻은 힌트들을 조합하여 비밀번호를 입력하세요.</p>
            <input type="text" id="door-password" placeholder="비밀번호 4자리" maxlength="4">
            <button id="door-submit">탈출</button>
        `;
        openModal();
        
        document.getElementById('door-submit').addEventListener('click', () => {
            const password = document.getElementById('door-password').value;
            if (password === '0815') {
                modalBody.innerHTML = `
                    <h2>탈출 성공!</h2>
                    <p>축하합니다. 교실에서 무사히 탈출했습니다!</p>
                `;
            } else {
                alert('비밀번호가 틀렸습니다. 힌트를 다시 확인해주세요.');
            }
        });
    });
});