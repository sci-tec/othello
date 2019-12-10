## セットアップ手順

1. GitHubアカウントを作成しログイン
2. https://github.com/sci-tec/othello に移動してFork
3. 自分のGitHubアカウントにForkしたリポジトリがあるので、移動(おそらく2.が済めば自動的に移動しています)
4. 作業ディレクトリへ移動
5. git clone 3.でフォークしたリポジトリの複製をローカルに作成 (注意: 2をクローンしないように)
6. 5.で作ったワークツリーで下記コマンドを順に実行
```
cd othello
npm install
gulp
```

