'use strict';
const userNameInput = document.getElementById('user-name');
//入力欄
const assessmentButton = document.getElementById('assessment');
//診断するボタン
const resultDivided = document.getElementById('result-area');
//診断結果を表示するエリア
const tweetDivided = document.getElementById('tweet-area');
//ツイートボタンを作成するエリア

userNameInput.onkeydown = (e) =>{
  if(e.key === 'Enter'){//Enterキーが押されたら
    assessmentButton.onclick();
    //診断クリックボタンがクリックされた時の処理を呼び出す
  }
}



assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if(userName.length === 0){
    //名前の入力がなければ関数の処理を終了する
    return ;
  }
  //診断結果を作成して
  //HTMLに表示する
  resultDivided.innerText = '';
  tweetDivided.innerText = '';
  
  // headerDivided の作成
  const headerDivided = document.createElement('div');
  headerDivided.setAttribute('class', 'card-header');
  headerDivided.innerText = '診断結果';

  // bodyDivided の作成
  const bodyDivided = document.createElement('div');
  bodyDivided.setAttribute('class', 'card-body');

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'card-text');
  const result = assessment(userName);
  paragraph.innerText = result;
  bodyDivided.appendChild(paragraph);

  // resultDivided に Bootstrap のスタイルを適用する
  resultDivided.setAttribute('class', 'card');
  resultDivided.setAttribute('style', 'max-width: 700px;')

  // headerDivided と bodyDivided を resultDivided に差し込む
  resultDivided.appendChild(headerDivided);
  resultDivided.appendChild(bodyDivided);

  //tweetボタンを作成するよー
  tweetDivided.innerText = '';
  //診断ボタン押すたびにツイートボタンが増えないように都度消す
  const anchor = document.createElement('a')//<a></a>
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='+encodeURIComponent('あなたのいいところ')+'&ref_src=twsrc%5Etfw';

  anchor.setAttribute('href',hrefValue);
  //<a href = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw'></a>
  anchor.setAttribute('class','twitter-hashtag-button');
  //<a href = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw' class = 'twitter-hashtag-button'></a>
  anchor.setAttribute('data-text',result);
  anchor.innerText = 'Tweet #あなたのいいところ';

  tweetDivided.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src','https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

const answers = [
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

function assessment(userName){
  //診断処理を実装するよ
  //入力が同じ名前なら同じ診断結果を出力する
  let sumOfCharCode = 0;
  for(let i = 0; i < userName.length; i++){
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }
  //0から15の範囲までに納める
  const index = sumOfCharCode % answers.length;
  let  result = answers[index];//診断結果を取り出してくる
  result = result.replaceAll('{userName}', userName);//置き換える
  return result;
}
//太郎のいいところは情熱です。太郎の情熱に周りの人は感化されます。
console.log(assessment('太郎'));

console.assert(assessment('太郎') === '太郎のいいところは情熱です。太郎の情熱に周りの人は感化されます。','診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。');
console.assert(assessment('太郎') === '太郎のいいところは情熱です。太郎の情熱に周りの人は感化されます','診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。');
