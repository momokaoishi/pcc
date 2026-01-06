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
        //noの時どうする？
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
const $resultArea = document.getElementById('result-area');
const $result = document.getElementById('result-pkg');
const $comment = document.getElementById('comment');
const $box = document.getElementById('box');
const $infoButton = document.getElementById('pkg-info');
let current = null;

document.getElementById('start-button').addEventListener('click', () => {
    current = 'q1';
    $questionArea.style.display = 'block';
    $box.style.display = 'block';
    $questionText.textContent = flow[current].question
    $startButton.style.display = 'none';
    $comment.style.display = 'none';
});

let resultPkg = null; //どのパッケージか覚えるURLに使う
const goNext = (answer) => {
    const nextQuestion = flow[current][answer];
    const finalResult = flow[nextQuestion];
    
    if(typeof finalResult === 'string') {
        $questionArea.style.display = 'none';
        $resultArea.style.display = 'block';
        $result.textContent = finalResult;
        resultPkg = finalResult;
    }

    current = nextQuestion;
    $questionText.textContent = flow[current].question;
};

//yesの時どうなるか
$yesButton.addEventListener('click', () => {
    goNext('yes');
});

//noの時
$noButton.addEventListener('click', () => {
    goNext('no');
});

$infoButton.addEventListener('click', () => {
    const url = packageLinks[resultPkg];
    location.href = url;
});


