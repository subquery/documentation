# ブロックチェーンの取得したバッチサイズを変更するには？

## ビデオのガイド

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/LO_Gea_IN_s" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## はじめに

既定のバッチサイズは 100 ですが、追加コマンド `--batch-size=xx` で変更可能です。

このフラグをコマンドラインに追加するか、Docker を使用している場合は、docker-compose.yml を以下に変更します。

```shell
subquery-node:
    image: onfinality/subql-node:latest
    depends_on:
      - "postgres"
    restart: always
    environment:
      DB_USER: postgres
      DB_PASS: postgres
      DB_DATABASE: postgres
      DB_HOST: postgres
      DB_PORT: 5432
    volumes:
      - ./:/app
    command:
      - -f=/app
      - --local
      - --batch-size=50

```

この例では、バッチサイズを 50 に設定しています。

## なぜバッチサイズを変更するのですか？

よりバッチサイズを小さくすることで、メモリ使用量を削減し、大規模なクエリでもユーザーを待たせることがありません。 つまり、アプリケーションの応答性を高めることが出来ます。
