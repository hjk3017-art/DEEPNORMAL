const questions = [
    {
        q: "최근 부부관계를 가질 때, 시작 전부터 통증이 걱정된 적이 있나요?",
        a: [
            { text: "항상 걱정되고 무섭다.", score: 20 },
            { text: "가끔 건조해서 아플까 봐 걱정된다.", score: 15 },
            { text: "조금 불편할 때는 있지만 참을 만하다.", score: 5 },
            { text: "전혀 걱정 없다. 항상 촉촉하다.", score: 0 }
        ]
    },
    {
        q: "관계 중 애액(윤활) 부족으로 인해 쓰라림이나 뻑뻑함을 느끼시나요?",
        a: [
            { text: "매번 심하게 느낀다.", score: 20 },
            { text: "중간에 마르는 느낌이 들어 아프다.", score: 15 },
            { text: "컨디션에 따라 가끔 그렇다.", score: 10 },
            { text: "부드럽고 전혀 불편함이 없다.", score: 0 }
        ]
    },
    {
        q: "관계 후 외음부가 붓거나 따가운 증상이 며칠간 지속되나요?",
        a: [
            { text: "자주 지속되며 일상생활이 불편하다.", score: 20 },
            { text: "관계 직후 하루 정도는 따갑다.", score: 10 },
            { text: "거의 없다.", score: 5 },
            { text: "전혀 없다.", score: 0 }
        ]
    },
    {
        q: "통증과 건조함 때문에 파트너와의 잠자리를 의도적으로 피한 적이 있나요?",
        a: [
            { text: "자주 피한다. 이제는 의무 방어전도 힘들다.", score: 20 },
            { text: "피하고 싶지만 미안해서 억지로 할 때가 있다.", score: 15 },
            { text: "피한 적은 없다.", score: 5 },
            { text: "전혀 없다. 오히려 기다려진다.", score: 0 }
        ]
    },
    {
        q: "나이가 들면서(혹은 출산 후) 체질의 변화로 건조증이 심해졌다고 느끼시나요?",
        a: [
            { text: "확실히 심해졌다. 예전 같지 않다.", score: 20 },
            { text: "조금 건조해진 것 같다.", score: 10 },
            { text: "잘 모르겠다.", score: 5 },
            { text: "예전과 똑같이 건강하다.", score: 0 }
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
    
    const progress = ((currentQ) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('q-counter').innerText = `${currentQ + 1} / ${questions.length}`;
    
    document.getElementById('q-title').innerText = qData.q;
    
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

    if (totalScore >= 70) {
        title = "건조증 경고!\n의무방어전은 이제 그만";
        level = "고위험군 (극심한 건조와 통증)";
        gaugeColor = "var(--red)";
        gaugeWidth = "95%";
        desc = "심각한 상태입니다. 갱년기 호르몬 변화 혹은 스트레스로 인해 애액 분비가 급격히 줄어들었습니다. 마찰로 인한 상처와 통증 때문에 관계 자체가 고통으로 느껴집니다. 참지 마세요! 부족한 수분을 채워주는 마사지젤만 사용해도 통증이 씻은 듯이 사라집니다.";
    } else if (totalScore >= 40) {
        title = "2% 부족한 수분,\n은근한 뻑뻑함 주의";
        level = "주의 요망 (초기 건조증상)";
        gaugeColor = "#ffa502";
        gaugeWidth = "60%";
        desc = "초반에는 괜찮지만 중간에 마르는 느낌이 들어 뻑뻑함을 느끼는 단계입니다. 파트너에게 말하긴 미안해서 참고 넘어가지만, 이대로 방치하면 질 건조증이 더 악화될 수 있습니다. 성분이 착한 수용성 젤로 부드러움을 더해보세요.";
    } else {
        title = "촉촉하고 건강한\n완벽한 부부관계!";
        level = "안정적 (매우 건강함)";
        gaugeColor = "#2ed573";
        gaugeWidth = "20%";
        desc = "아주 건강하고 촉촉한 상태를 유지하고 계십니다! 파트너와의 교감도 훌륭하며 건조함으로 인한 스트레스도 거의 없습니다. 지금처럼 건강한 관계를 유지하시되, 더욱 특별한 분위기를 원하신다면 부드러운 마사지로 색다른 경험을 해보는 것도 좋습니다.";
    }

    document.getElementById('r-title').innerText = title;
    document.getElementById('r-level').innerText = level;
    document.getElementById('r-level').style.color = gaugeColor;
    document.getElementById('r-desc').innerText = desc;
    
    document.getElementById('gauge-fill').style.width = gaugeWidth;
    document.getElementById('gauge-fill').style.background = gaugeColor;
    
    const affiliateUrl = "https://checkit082.com/product/부부관계-마사지젤-갱년기-한결수젤/20/category/56/display/1/"; 
    document.getElementById('affiliate-link').href = affiliateUrl;
}
