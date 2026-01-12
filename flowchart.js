const flow = {
    q1: {
        question: '12時から9時まで滞在できる',
        yes: 'q2',
        no: 'q6'
    },
    q2: {
        question: 'ディナーをつけたい',
        yes: 'q3',
        no: 'ih'
    },
    q3: {
        question: '日本語のツアーを楽しみたい',
        yes: 'q4',
        no: 'q5'
    },
    q4: {
        question: '自分のグループ専属のツアーガイドをつけたい',
        yes: 'sal',
        no: 'al'
    },
    q5: {
        question: 'ステージに近い席でナイトショーを見たい',
        yes: 'gwd',
        no: 'gw'
    },
    q6: {
        question: '夕方から行きたい',
        yes: 'q7',
        no: 'q9'
    },
    q7: {
        question: 'ディナーをつけたい',
        yes: 'q8',
        no: 'ha'
    },
    q8: {
        question: 'ステージに近い席でナイトショーを見たい',
        yes: 'twd',
        no: 'tw'
    },
    q9: {
        question: '夕方には帰る予定',
        yes: 'iop',
        no: 'q1'
    },
    ih: 'アイランド・オブ・ポリネシア&ナイトショー',
    sal: 'スーパーアンバサダー・ルアウ',
    al: 'アリイ・ルアウ',
    gwd: 'ゲートウェイ・デラックス',
    gw: 'ゲートウェイビュッフェ',
    ha: 'ナイトショー（電話で予約可能）',
    twd: 'トワイライト・デラックス',
    tw: 'トワイライト',
    iop: 'アイランド・オブ・ポリネシア'
};

const packageLinks = {
    ih: 'https://polynesia.jp/packages/all/islands-and-ha-show-package?_d=&_bid=119&_ca=&_ta=35',
    sal: 'https://polynesia.jp/packages/all/exclusive-super-ambassador-luau-package?_d=&_bid=101&_ca=&_ta=17',
    al: 'https://polynesia.jp/packages/all/exclusive-alii-luau?_d=&_bid=102&_ca=&_ta=40',
    gwd: 'https://polynesia.jp/packages/all/exclusive-gateway-deluxe-package',
    gw: 'https://polynesia.jp/packages/all/exclusive-gateway-buffet?_d=&_bid=103&_ca=&_ta=35',
    ha: 'https://polynesia.jp/ha-show',
    twd: 'https://polynesia.jp/packages/all/twilight-deluxe-package',
    tw: 'https://polynesia.jp/packages/all/twilight-package',
    iop: 'https://polynesia.jp/packages/all/islands-polynesia?_d=&_bid=107&_ca=&_ta=45'
};

const $startButton = document.getElementById('start-button');
const $questionArea = document.getElementById('question-area');
const $questionText = document.getElementById('pkg-question');
const $yesButton = document.getElementById('yes-button');
const $noButton = document.getElementById('no-button');
const $backButton = document.getElementById('back-button');
const $resultArea = document.getElementById('result-area');
const $result = document.getElementById('result-pkg');
const $comment = document.getElementById('comment');
const $infoButton = document.getElementById('info-button');
const $resetButton = document.getElementById('reset-button');
let current = null;
let history = [];

//最初の質問の時は戻るボタンを非表示にする
const displayBackButton = () => {
    if (history.length === 0) {
        $backButton.style.display = 'none';
    } else {
        $backButton.style.display = 'block';
    }
};

//Questions and answer buttons show up, and the start button and text will not be displayed after clicking the start button
document.getElementById('start-button').addEventListener('click', () => {
    current = 'q1';
    history = []; 
    $questionArea.style.display = 'block';
    $questionText.textContent = flow[current].question
    $startButton.style.display = 'none';
    $comment.style.display = 'none';
    displayBackButton();
});

//Store the current question to history to go back. Show the next question. If the next element is string, show the result. 
let resultPkg = null; //どのパッケージか覚えるURLに使う
const goNext = (answer) => {
    const nextQuestion = flow[current][answer];
    const finalResult = flow[nextQuestion];
    
    if (typeof finalResult === 'string') {
        $questionArea.style.display = 'none';
        $resultArea.style.display = 'block';
        $result.textContent = finalResult;
        resultPkg = nextQuestion;
    }

    history.push(current);
    current = nextQuestion;
    $questionText.textContent = flow[current].question;
    displayBackButton();
};

//When a user clicks yes
$yesButton.addEventListener('click', () => {
    goNext('yes');
});

//When a user clicks no
$noButton.addEventListener('click', () => {
    goNext('no');
});

//If a user wants to go back to the previus question, show the last question in history
$backButton.addEventListener('click', () => {
    current = history.pop();
    $questionText.textContent = flow[current].question;
    displayBackButton();
});

//Go to the page for each package on the official website
$infoButton.addEventListener('click', () => {
    const url = packageLinks[resultPkg];
    location.href = url;
});

//If a user wants to do it again, the start button and the text will show up. The result won't be displayed.
$resetButton.addEventListener('click', () => {
    current = null;
    resultPkg = null;

    $resultArea.style.display = 'none';
    $questionArea.style.display = 'none';

    $startButton.style.display = 'block';
    $comment.style.display = 'block';

    displayBackButton();
});



