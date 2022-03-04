# Thuật ngữ

- Dự án SubQuery (* nơi điều kỳ diệu xảy ra *): Định nghĩa ([ ` @ subql / cli ` ](https://www.npmjs.com/package/@subql/cli)) về cách một SubQuery Node sẽ đi qua và tổng hợp một mạng dự án, và dữ liệu sẽ được chuyển đổi và lưu trữ như thế nào để kích hoạt các truy vấn GraphQL hữu ích
- SubQuery Node (* nơi công việc được thực hiện *): Một Package ([ ` @ subql / node ` ](https://www.npmjs.com/package/@subql/node)) sẽ chấp nhận một dự án SubQuery xác định và chạy một Node liên tục lập chỉ mục một Network được kết nối với một database
- Dịch vụ truy vấn SubQuery (_nơi để lấy dữ liệu_): Package này ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) tương tác với API GraphQL của một Node SubQuery đã được triển khai để truy vấn và xem dữ liệu được lập Index
- GraphQL (_cách để truy vấn dữ liệu_): Đây là một ngôn ngữ truy vấn dành cho các API, đặc biệt phù hợp với dữ liệu dựa trên biểu đồ linh hoạt - xem [graphql.org](https://graphql.org/learn/)