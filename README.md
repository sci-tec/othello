## セットアップ手順

1. GitHubアカウントを作成しログイン
2. https://github.com/sci-tec/othello に移動して
3. developブランチを表示してFork
4. 自分のGitHubアカウントにForkしたリポジトリがあるので、移動(おそらく3.が済めば自動的に移動しています)
5. 作業ディレクトリへ移動
6. git clone 4.でフォークしたリポジトリの複製をローカルに作成 (注意: 2をクローンしないように)
7. 6.でできたワークツリーに移動
```
cd othello
```
8. .gitignore ファイル(git管理から除外するリスト)を作る
```
code .gitignore
```
9. VSCodeが開くので、描きを追加
```
node_modules
dist/css/
```
10. nodeモジュールをインストールしてgulp実行
```
npm install
```
11. 実行
```
gulp
```

## 自分のリポジトリからフォーク元にプルリク、承認後にその最新の内容を自分のローカルリポジトリに反映させるまで

#### ワークツリー変更〜プルリク送信まで

1. ワークツリーの内容を変更
2. `git add`
3. `git commit` ローカルリポジトリを更新
4. `git push` 自分のリモートリポジトリを更新
5. GitHubの自分のリポジトリを表示
6. 対象のブランチに移動して、New pull requerstボタンをクリック
7. 自分のリポジトリの目的のブランチ → プルリク先(フォーク元)の**develop**ブランチ(masterではない)になっているか確認
8. プルリク送信

#### 【事前準備】リモートリポジトリの内容確認とフォーク元リポジトリの追加

`git remote -v` で現在設定されているリモートリポジトリのアドレスが確認できます。
これは、`git pull` や `git push` をした際の問い合わせ先で、URLの先頭に表示される"origin"などの登録名で指定します。
リポジトリは、複数選択できるので下記手順で、予めフォーク元のリポジトリを`root`という名前で登録しましょう。
これにより、最新版のソースコードをフォーク元からで取り込めるようになります。

```
git remote add root git@github.com:sci-tec/othello.git
```

ちなみに削除は以下になります。

```
git remote rm root
```
root の部分は登録時に決めた任意の名前です

#### 承認後から最新版リポジトリをローカルに反映させるまで
承認されたあとは、(予め話し合って決めていた)、フォーク元の指定ブランチから `git pull`します。

9. 
```
git pull root master
```

これは、`git remote -v` で表示される予め設定していた名前の`root` リポジトリから `master` ブランチをpullしてくるという意味になります。


## MAMPとの連携(PHP)

MAMPを起動して、Webサーバのルートディレクトリをdistディレクトリに設定する。

1. MAMPを起動
2. Preferences -> Wev server のDocument rootを ワークツリーの distディレクトリに設定する
3. ターミナルで、distディレクトリに移動し、下記コマンドでpusherに必要なファイルをインストール
`composer require pusher/pusher-php-server`
4. ブラウザで localhost/client.php を開く(MAMP設定によりポート番号が違う可能性があります)
5. ブラウザで localhost/sernder.php を開くと、4.のページに通知が来る事が確認できます

以上。

