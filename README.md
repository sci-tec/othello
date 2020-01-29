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

以上

2020.01.22 追記

## Docker環境構築及び起動方法

Windows for MAMPのpusher動作不具合を受け、Docker+docker-composeによる運用を検討してみたいと思います。下記手順で環境を構築してください。
参考: https://qiita.com/ksh-fthr/items/6b1242c010fac7395a45

### Dockerインストール手順

1. ここでDocker Hubのアカウントを作成します
https://hub.docker.com/
2. 1.のアカウントを使ってここのリンクからDocker for Windowsをダウンロード
https://docs.docker.com/docker-for-windows/install/#install-docker-desktop-for-windows-desktop-app
3. インストール後、`docker version` でバージョン確認。(バージョンなどが表示されればOK)
4. 更に、`docker run hello-world` で動作確認。下記にように表示されればOK
> Hello from Docker!
> This message shows that your installation appears to be working correctly.
> ...

### docker-composeインストール手順

https://github.com/docker/compose/releases によると、上記Dockerインストールによりdocker-composeも入っていると思われる。(Mac & Windowsユーザのみ)よって省略します。

### 起動方法
**MAMPは使わないので、事前に終了しておいてください**

1. `cd`コマンドでothelloプロジェクトルート(README.mdファイルがある場所)へ移動
2. `git pull root master` で本家から最新版をpullする
3. `docker-compose up --build` でサーバ起動
4. 下記アドレスにアクセスして動作確認をしてください
- webサーバ http://localhost:28888
- pypMyAdmin http://localhost:28889


2020.01.28 追記

## Mac以外の端末でlocalhostサーバを立ち上げる場合
Mac以外の端末でサーバを立ち上げたとき、Pusherの送信がうまくいかないため、Node.jsサーバを立ち上げて代用する

1. `cd othello` でothelloプロジェクトルートに移動
2. `git pull root master` で最新版を取り込む
3. `npm install` でpusherをインストール
4. VS Codeでターミナルウィンドウを新規に開く
5. `node node-server/server.js` でサーバ起動

エラー表示にならず起動後は無反応であった場合、正常に起動していますので、gulpと同様に開いたターミナルはそのままにしておきます。

## データベース接続情報の外部ファイル化

1. dist内に`env.php` ファイルを作成して下記内容を作成します。
ポート番号はそれぞれ使用している番号に置き換えてください。
```
<?php
$DB_HOST="localhost:8889";
$DB_NAME="othello";
$DB_USERNAME="root";
$DB_PASSWORD="root";
?>
```

