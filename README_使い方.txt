22年育成記録 v2 / GitHub Pages用

【置き方】
このZIPを解凍し、「中身」をGitHubリポジトリの一番上へ入れてください。

正しい形：
index.html
css/
js/
data/
assets/
README_使い方.txt

index.html がリポジトリ直下に見えていればOKです。

GitHub Pages:
Settings → Pages → Deploy from a branch → main → /(root) → Save

【v2で追加したもの】
・年齢は自動で上がりません
・0〜21歳は好きなだけ行動できます
・「次の年齢へ」を押した時だけ1歳上がります
・22歳で成人結果画面へ
・妊娠中は父母が画面に登場して会話
・吹き出し会話
・ブラウザの日本語読み上げ
・ボタン決定音、簡易BGM
・対応端末では短い振動
・2頭身キャラの表情差分
  neutral / happy / sad / angry / scared / sick / sleepy / hurt
・怪我差分
  絆創膏 / あざ / ギプス
・継続医療ケアの簡易表示
・同じ行動を押してもイベント候補からランダム
・年齢ごとの行動履歴
・3スロットセーブ
・22年間の日記
・家計/清潔度で部屋が変化

【音について】
現時点では外部音源なしでも鳴るよう、Web Audio APIで簡易BGMと効果音を生成しています。
本物のBGMや足音素材を入れる場合は assets/audio/ に置いて、js/audio.js を拡張すれば利用できます。

【イベント追加】
1イベント=1JSONです。

追加例:
data/events/child/age07_new_friend.json

追加したら data/events/index.json の files に
"./data/events/child/age07_new_friend.json"
を追加します。

【イベント基本例】
{
  "id": "age07_new_friend",
  "phase": "child",
  "category": "talk",
  "minAge": 7,
  "maxAge": 9,
  "weight": 5,
  "title": "新しい友達",
  "prompt": "{name}が帰宅して話し始めた。",
  "intro": [
    {"speaker":"child","expression":"happy","text":["今日ね！","聞いて！"]}
  ],
  "choices": [
    {
      "label": "話を聞く",
      "hint": "最後まで聞く。",
      "effects": {"attachment":3,"sociability":2},
      "record": "新しくできた友達の話を聞いた。",
      "result": [
        {"speaker":"child","expression":"happy","text":"また遊ぶんだ。"}
      ]
    }
  ]
}

【speaker】
child / mother / father / player / partner

【expression】
neutral / happy / sad / angry / scared / sick / sleepy / hurt

【category】
子ども期:
talk / play / outside / learn / rest / medical

妊娠期:
rest / checkup / home / partner / free / work

【effects】
money
cleanliness
family
partnerTrust
homeStress
prenatalRisk
prenatalCare
health
kindness
independence
attachment
dependence
rebellion
sociability
selfEsteem
school
delinquency

【appearance】
例:
"appearance": {
  "expression": "hurt",
  "injury": "bandage",
  "duration": 3
}

injury:
none / bandage / bruise / cast

【素材を後から入れる場所】
assets/audio/
assets/images/

現状はコード描画だけなので画像素材なしでも動きます。
