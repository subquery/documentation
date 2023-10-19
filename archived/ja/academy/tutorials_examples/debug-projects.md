# SubQuery プロジェクトをデバッグするには？

## ビデオのガイド

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/6NlaO-YN2q4" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## はじめに

コードのステップ実行、ブレークポイントの設定、変数の検査など、SubQuery プロジェクトのデバッグを行うには、Chrome の開発者ツールと組み合わせて、Node.js インスペクタを使用する必要があります。

## ノード監察

ターミナル画面で次のコマンドを実行します。

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

例：

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

## Chrome の開発ツール

Chrome 開発ツールを開き、Sources タブに移動します。 緑色のアイコンをクリックすると、新しいウィンドウが開きます。

![ノード監察](/assets/img/node_inspect.png)

ファイルシステムに移動し、プロジェクトフォルダをワークスペースに追加します。 次に dist > mappings フォルダを開き、デバッグしたいコードを選択します。 次に、標準的なデバッグツールと同様にコードをステップ実行します。

![プロジェクトのデバッグ](/assets/img/debugging_projects.png)
