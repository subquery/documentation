# Làm thế nào để chạy một nút chỉ mục?

## Video hướng dẫn

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/QfNsR12ItnA" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Giới thiệu

Running an indexer node is another option outside of using Docker or having a project hosted for you at [SubQuery Projects](https://project.subquery.network/). It requires more time and effort but will enhance your understanding of how SubQuery works under the covers.

## Postgres

Running an indexer node on your infrastructure will require the setup of a Postgres database. You can install Postgres from [here](https://www.postgresql.org/download/) and ensure the version is 12 or greater.

## Cài đặt subql / node

Sau đó, để chạy một nút SubQuery, hãy chạy lệnh sau:

```shell
npm install -g @subql/node
```

Cờ -g có nghĩa là cài đặt nó trên toàn cầu, có nghĩa là trên OSX, vị trí sẽ là / usr / local / lib / node_modules.

Sau khi cài đặt, bạn có thể kiểm tra phiên bản bằng cách chạy:

```shell
> subql-node --version
0.19.1
```

## Đặt cấu hình DB

Tiếp theo, bạn cần đặt các biến môi trường sau:

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
```

Of course, if you have different values for the above keys, please adjust accordingly. Note that the `env` command will display the current environment variables and that this process only sets these values temporarily. That is, they are only valid for the duration of the terminal session. To set them permanently, store them in your ~/bash_profile instead.

## Lập chỉ mục một dự án

Để bắt đầu lập chỉ mục một dự án, hãy điều hướng vào thư mục dự án của bạn và chạy lệnh sau:

```shell
subql-node -f .
```

If you do not have a project handy, `git clone https://github.com/subquery/subql-helloworld`. You should see the indexer node kick into life and start indexing blocks.

## Kiểm tra Postgres

If you navigate to Postgres, you should see two tables created. `public.subqueries` and `subquery_1.starter_entities`.

`public.subqueries` only contains 1 row which the indexer checks upon start up to “understand the current state” so it knows where to continue from. The `starter_entities` table contains the indexes. To view the data, run `select (*) from subquery_1.starter_entities`.
