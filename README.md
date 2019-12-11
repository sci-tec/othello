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
