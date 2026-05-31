const questions = [
    {
        q: "관계 시 평균적으로 소요되는 시간(삽입 후)은 어느 정도인가요?",
        a: [
            { text: "1분 미만 (넣자마자)", score: 20 },
            { text: "1~3분 (애국가 1절)", score: 15 },
            { text: "3~5분", score: 10 },
            { text: "5~10분 이상", score: 0 }
        ]
    },
    {
        q: "본인이 원할 때 사정을 참거나 조절할 수 있나요?",
        a: [
            { text: "전혀 안 된다. 느낌이 오면 끝이다.", score: 20 },
            { text: "가끔 되지만 대부분 실패한다.", score: 15 },
            { text: "어느 정도 조절이 가능하다.", score: 5 },
            { text: "완벽하게 컨트롤 가능하다.", score: 0 }
        ]
    },
    {
        q: "최근 파트너가 시간에 대해 아쉬움을 표현한 적이 있나요?",
        a: [
            { text: "자주 있다. 눈치가 보인다.", score: 20 },
            { text: "가끔 있다. 분위기가 싸해진다.", score: 10 },
            { text: "말은 안 하지만 표정이 아쉬워 보인다.", score: 10 },
            { text: "없다. 항상 만족해한다.", score: 0 }
        ]
    },
    {
        q: "관계 전부터 '빨리 끝나면 어떡하지?'라는 불안감이 드나요?",
        a: [
            { text: "항상 든다. 스트레스가 심하다.", score: 20 },
            { text: "가끔 든다.", score: 10 },
            { text: "거의 들지 않는다.", score: 5 },
            { text: "전혀 없다. 자신감 넘친다.", score: 0 }
        ]
    },
    {
        q: "두 번째 관계(연속)를 가질 때의 지속 시간은 어떤가요?",
        a: [
            { text: "두 번째도 금방 끝난다.", score: 20 },
            { text: "첫 번째보다는 길지만 여전히 아쉽다.", score: 15 },
            { text: "두 번째는 충분히 길다.", score: 5 },
            { text: "두 번 연속은 체력적으로 힘들다.", score: 10 }
        ]
    }
];

let currentQ = 0;
let totalScore = 0;

function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function startTest() {
    currentQ = 0;
    totalScore = 0;
    switchScreen('quiz-screen');
    renderQuestion();
}

function renderQuestion() {
    const qData = questions[currentQ];
    
    // Update progress
    const progress = ((currentQ) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('q-counter').innerText = `${currentQ + 1} / ${questions.length}`;
    
    // Set text
    document.getElementById('q-title').innerText = qData.q;
    
    // Set options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    qData.a.forEach((option, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = option.text;
        btn.onclick = () => selectOption(option.score);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(score) {
    totalScore += score;
    currentQ++;
    
    if (currentQ < questions.length) {
        renderQuestion();
    } else {
        showLoading();
    }
}

function showLoading() {
    switchScreen('loading-screen');
    
    setTimeout(() => { document.getElementById('step1').classList.add('done'); }, 800);
    setTimeout(() => { document.getElementById('step2').classList.add('done'); }, 1800);
    setTimeout(() => { document.getElementById('step3').classList.add('done'); }, 2800);
    
    setTimeout(() => {
        showResult();
    }, 3800);
}

function showResult() {
    switchScreen('result-screen');
    
    let title = "";
    let level = "";
    let desc = "";
    let gaugeColor = "";
    let gaugeWidth = "";

    // Score max is 100
    if (totalScore >= 70) {
        title = "위험수위! 파트너의\n인내심이 바닥났습니다.";
        level = "고위험군 (상위 5% 최단기록)";
        gaugeColor = "var(--red)";
        gaugeWidth = "95%";
        desc = "심각한 상태입니다. 삽입 전부터 심리적 불안감이 크며, 작은 자극에도 컨트롤이 불가능합니다. 파트너는 말은 안 해도 속으로 큰 실망을 느끼고 있을 확률이 99%입니다. 더 이상 자존심을 세울 때가 아닙니다. 즉각적인 외부의 도움이 필요합니다.";
    } else if (totalScore >= 40) {
        title = "아쉬운 타이머,\n늘 눈치가 보입니다.";
        level = "주의 요망 (평균 이하)";
        gaugeColor = "var(--gold)";
        gaugeWidth = "60%";
        desc = "컨디션에 따라 기복이 심하지만, 전반적으로 짧은 편입니다. 파트너가 달아오르기도 전에 끝나는 경우가 많아 분위기가 어색해집니다. 민감도를 낮춰주는 작은 도움만 받아도 지금보다 2~3배는 지속 시간을 늘릴 수 있습니다.";
    } else {
        title = "밤의 제왕!\n강력한 컨트롤의 소유자";
        level = "안정적 (상위 10%)";
        gaugeColor = "#10B981"; // Green
        gaugeWidth = "20%";
        desc = "아주 훌륭한 컨트롤 능력을 가지고 계십니다. 파트너를 만족시키는 데 큰 무리가 없으며 본인 스스로도 자신감이 넘칩니다. 다만 술자리가 잦거나 스트레스가 심할 때를 대비해 비장의 무기 하나쯤은 알아두는 것도 나쁘지 않습니다.";
    }

    document.getElementById('r-title').innerText = title;
    document.getElementById('r-level').innerText = level;
    document.getElementById('r-level').style.color = gaugeColor;
    document.getElementById('r-desc').innerText = desc;
    
    document.getElementById('gauge-fill').style.width = gaugeWidth;
    document.getElementById('gauge-fill').style.background = gaugeColor;
    
    // 남성용(조루) 마취 크림/젤 제휴 링크 (임시로 기본 사이트로 설정)
    const affiliateUrl = "https://checkit082.com/product/%EC%A1%B0%EB%A3%A8-%EA%B0%9C%EC%84%A0-%EC%82%AC%EC%A0%95-%EC%A7%80%EC%97%B0-%EB%A7%88%EC%82%AC%EC%A7%80%EA%B8%B0-%EA%BC%AC%EB%B6%80%EA%B8%B0%EB%91%90/12/category/57/display/1/"; 
    document.getElementById('affiliate-link').href = affiliateUrl;
}
