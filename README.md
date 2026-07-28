# 夏のひんやりトレジャー

GitHub Pagesへそのまま公開できる静的サイトです。

## フォルダ構成

```text
hinnyari-treasure/
├─ index.html                    共通入口・当日の問題
├─ complete.html                 当日の真実の入口
├─ app.js                        日付判定と画面制御
├─ styles.css                    デザイン
├─ config/
│  ├─ date-control.js            本番／テストの日付切替
│  └─ campaign.js                開催日・合言葉・キー・画像対応
├─ images/
│  ├─ daily/                     日替わり元画像8枚
│  └─ promotion/                 告知素材の保管場所
└─ .nojekyll
```

## 日替わり画像

同じ元画像を問題画面と真実の入口で共用します。問題画面だけ、Web側で画像右側へモザイクと「？」を重ねます。

```text
images/daily/daily-0810.png
images/daily/daily-0811.png
images/daily/daily-0812.png
images/daily/daily-0813.png
images/daily/daily-0814.png
images/daily/daily-0815.png
images/daily/daily-0816.png
images/daily/daily-0817.png
```

## 日付の本番／テスト切替

`config/date-control.js` だけを編集します。

### 本番運用

```js
mode: "live",
testDate: "2026-08-10"
```

`live`では日本時間の実際の日付を参照します。`testDate`の値は無視されます。

### テスト運用

```js
mode: "test",
testDate: "2026-08-10"
```

`test`では実際の日付に関係なく、`testDate`に指定した日の問題と真実の入口を表示します。8日分を試す場合は、`2026-08-10`から`2026-08-17`まで順番に変更します。

テスト終了後は、公開前に必ず `mode: "live"` へ戻します。

## お客様の参加フロー

1. LINEリッチメニューから共通入口へ入る
2. 「画像を見る」をタップ
3. モザイク画像を確認
4. スタッフから当日の合言葉を聞く
5. LINEトークへ合言葉を入力
6. 本社設定の「解読完了」画像が届く
7. 画像をタップして当日の真実の入口を開く
8. モザイクなし画像と `MISSION COMPLETE!` を確認
9. 画面をスタッフへ提示する
10. ドリンクと冷感グッズを受け取る

## 本社へ渡す真実の入口URL

公開URLが `https://ユーザー名.github.io/リポジトリ名/` の場合、各返信画像へ次のURLを設定します。

| 日付 | 合言葉（仮） | URL末尾 |
|---|---|---|
| 8/10 | ドリンク | `complete.html?day=20260810&key=m8q4t7` |
| 8/11 | 冷感タオル | `complete.html?day=20260811&key=h2n9kc` |
| 8/12 | ハンディファン | `complete.html?day=20260812&key=p6v3sa` |
| 8/13 | かき氷 | `complete.html?day=20260813&key=r7b5dx` |
| 8/14 | 保冷剤 | `complete.html?day=20260814&key=w3j8fm` |
| 8/15 | 宝箱 | `complete.html?day=20260815&key=c9y2lg` |
| 8/16 | 鍵 | `complete.html?day=20260816&key=k4u7ze` |
| 8/17 | ひまわり | `complete.html?day=20260817&key=s5a8qn` |

テストモードでも、指定した `testDate` とURLの日付・キーが一致した時だけ真実の入口が開きます。

## GitHub Pages公開

1. このフォルダの中身をリポジトリ直下へアップロード
2. GitHubの `Settings` → `Pages`
3. `Deploy from a branch` を選択
4. Branchを `main`、フォルダを `/(root)` に設定
5. 公開URLをLINEリッチメニューのリンクに設定

GitHub Pagesは静的サイトのため、設定やキーを完全に秘匿する用途には向きません。本仕組みは前日や別日の完成リンクをそのまま利用できないようにする、運用上の抑止として使用します。
