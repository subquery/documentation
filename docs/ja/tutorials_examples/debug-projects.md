# SubQueryプロジェクトをデバッグするには？

## ビデオガイド

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/6NlaO-YN2q4" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## はじめに

コードのステップ実行、ブレークポイントの設定、変数の検査など、SubQueryプロジェクトのデバッグを行うには、Chromeの開発者ツールと組み合わせて、Node.jsインスペクタを使用する必要があります。

## ノードインスペクター

ターミナル画面で次のコマンドを実行します。

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

例
```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

## Chromeの開発ツール

Chrome 開発ツールを開き、Sourcesタブに移動します。 緑色のアイコンをクリックすると、新しいウィンドウが開きます。

![ノードインスペクター](/assets/img/node_inspect.png)

ファイルシステムに移動し、プロジェクトフォルダをワークスペースに追加します。 次にdist > mappingsフォルダを開き、デバッグしたいコードを選択します。 次に、標準的なデバッグツールと同様にコードをステップ実行します。

![プロジェクトのデバッグ](/assets/img/debugging_projects.png)
