# Visualising Data with Metabase

The objective of this guide is to show you how to analyse data from any SubQuery indexing project within Metabase. Metabase is a robust, open-source data visualisation tool.

## Configuring SubQuery

:::warning Automated Historical State Tracking

When running your project for the sole purpose of visualising in Metabase, we strongly recommending running your project with [Automated Historical State Tracking](../historical.md) disabled.

Automated Historical State Tracking alters the underlying DB tables to manage state tracking for you automatically. However this may make things complicated for Metabase visualisations. You can read more about these alterations [here](../historical.md#db-schema).

:::

At a high level, there is no specific configuration required to ensure compatibility between your SubQuery indexing project and Metabase. The key factor is that your Metabase instance must be able to access the Postgres database that your SubQuery project is indexing into.

For that reason, visualising data in Metabase is not supported in SubQuery decentralised network or Managed Service, you must self host and run your SubQuery Indexing project.

You will want to follow the guide on how to run your [SubQuery indexing project locally](../run.md#running-subquery-locally). Please pay attention to what you set as your Postgres database host, port, username, and password.

## Configuring Metabase

Setting up and running Metabase is a simple procedure that can be accomplished by following the instructions outlined in the official Metabase documentation:

[Metabase Installation Guide](https://www.metabase.com/docs/latest/installation-and-operation/installing-metabase)

The installation steps are thoroughly documented, ensuring a seamless configuration of the analytics tool. After successfully installing Metabase, the subsequent step involves establishing a connection to the Postgres database used by your SubQuery indexer to store the indexed blockchain data. To link Metabase with the SubQuery indexer, you need to input essential connection details such as the database host, port, username, and password. When launching Metabase for the first time, you will encounter the following screen:

![](/assets/img/run_publish/metabase/metabase-database-connection.png)

If you are running your indexer project [locally](./run.md) through Docker, all the requisite information can be found in the `docker-compose.yml` file. When you provide the correct credentials, Metabase will attempt to establish a connection. It will only proceed if the connection is successful. This connection allows Metabase to access the indexed blockchain data, enabling robust analysis and visualisation capabilities.

## Browse Data

After successfully logging into Metabase, you'll land on the homepage, providing access to explore your databases. To find the table housing your indexer project data, follow these steps:

1. Go to the `Our Data` section found in the top navigation bar of the Metabase interface
2. Choose the `Postgres` option from the available database choices.
3. Identify the particular database instance that aligns with your data, labeled as `app` or using another relevant identifier you've assigned.
4. Within the chosen database instance, you'll discover the tables and views linked to your indexer.

## Query Data

Having identified the tables in the databases, we can now move forward to retrieve information and generate insightful visualisations using Metabase's user-friendly interface. This guide uses the [Osmosis Dex project](https://github.com/subquery/cosmos-subql-starter/tree/main/Osmosis/osmosis-dex-data) as the example, and you can access the source code for this project [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Osmosis/osmosis-dex-data).

### Intuitive drag-and-drop interface

In the first example, we retrieve the number of swaps grouped by hour and present the data in two formats: a pie chart and a line graph. Constructing the aforementioned query is a simple task that can be accomplished using Metabase's easy-to-use drag-and-drop interface.

![](/assets/img/run_publish/metabase/metabaseSwapCountByHourQuery.png)

Once the query is executed, you can set up the pie chart visualisation within Metabase to obtain the resulting chart:

![](/assets/img/run_publish/metabase/metabaseSwapCountByHourResultPieChart.png)

The same data can also be displayed in the form of a line graph:

![](/assets/img/run_publish/metabase/metabaseSwapCountByHourResultLineGraph.png)

There are various other visualisations to choose from, and the most suitable option may depend on the specific use case.

Now, when querying the other table which contains information on pools and summing them based on liquidity, the query can be constructed in the following manner:

![](/assets/img/run_publish/metabase/metabaseLiquidityByPoolsQuery.png)

A graph displaying sorted pools would be the most suitable, so let's showcase the data in this format.

![](/assets/img/run_publish/metabase/metabaseLiquidityByPoolsResult.png)

### SQL

We previously discussed the drag-and-drop interface. Essentially, this type of interface functions as a SQL code generator. Metabase translates the parameters set in the user interface into SQL, then queries the database to retrieve and subsequently visualise the data. For example, the SQL code for the last query can be accessed on the same screen, and it will appear as follows:

![](/assets/img/run_publish/metabase/metabaseLiquidityByPoolsQuerySQL.png)

This allows you to instantly create all your queries in SQL. In certain instances, when you require more advanced features of this query language, such as subqueries or window functions, using SQL becomes necessary, as the drag-and-drop UI can only handle basic query scenarios.

## Other Features

In addition to the fundamental query visualisations, Metabase offers a variety of advanced functionalities that can significantly enrich your data exploration and analysis experience. To delve deeper into Metabase's capabilities and broaden your understanding, we encourage you to explore the official Metabase Documentation. To uncover the potential of some core features:

1. **Dashboards:** are a robust feature enabling the creation of curated collections of visualisations, reports, and metrics in a consolidated view. With dashboards, you can bring together pertinent data insights into a centralised location for easy access and monitoring.

2. **Data Transformations with Models:** refine and manipulate your data within Metabase using its built-in data transformation capabilities. Clean, transform, and aggregate data to create derived tables, perform calculations, and gain new insights—all without leaving the platform.

3. **Advanced Visualisations:** to explore beyond basic charts with Metabase's advanced visualisation options.

4. **Parameterised Queries:** to make your queries interactive and dynamic by incorporating parameters.

5. **Data Alerts and Scheduled Reports:** to stay informed about critical data changes with Metabase's data alerts and scheduled reports.
