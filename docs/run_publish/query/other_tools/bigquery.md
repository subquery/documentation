# Querying Data with BigQuery

A distinctive capability of SubQuery lies in its capacity to export processed data to [CSV files](../../references.md#csv-out-dir). This seemingly straightforward export feature unlocks new possibilities for users. The universality of the CSV format ensures smooth integration with a variety of analytical and querying systems, whether you prefer Google Sheets, Excel, or any other data analysis tool.

While CSV export provides broad compatibility, the tool takes a significant leap forward by seamlessly integrating with [Google BigQuery](https://cloud.google.com/bigquery). You can effortlessly load their CSV files into BigQuery, tapping into the platform's robust querying and analytical capabilities.

## Loading Data to BigQuery

To initiate the process, ensure that the indexed data is set to save in CSV files by enabling the [relevant flag](../../references.md#csv-out-dir). Upon successful configuration, CSV files will be automatically created and populated as the indexing process runs.

Once a sufficient amount of data is indexed for analysis, it's time to load it into BigQuery. Begin by creating an account on [Google Cloud](https://cloud.google.com) if you haven't already. Follow the steps outlined in [Enable the BigQuery sandbox](https://cloud.google.com/bigquery/docs/sandbox) to set up your account.

Once your account is created, you can proceed to batch load the data. Depending on your deployment setup, the commands for loading data to BigQuery may vary slightly. Refer to specific guides for more details:

- [Loading data from local files](https://cloud.google.com/bigquery/docs/batch-loading-data#loading_data_from_local_files)
- [Loading CSV data from Cloud Storage](https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv)

After loading the data, you can proceed to query it. The provided screenshot from the Google Console showcases the successful execution of a `SELECT *` query on one of the loaded CSV files:

![](/assets/img/run_publish/bigquery/consoleBigquery.png)

By uploading your data to BigQuery, you not only gain access to a platform designed for limitless scalability and seamless integration with Google Cloud services but also benefit from a serverless architecture. This allows you to focus on analytics rather than infrastructure management, marking a strategic move towards maximizing the potential of your data.

## Google BigQuery vs. Local Postgres

While Postgres is the default, understanding the advantages of BigQuery can unveil new possibilities.

| **Benefits** of Uploading to **BigQuery**                                                         | **Disadvantages** of Uploading to **BigQuery**                                        |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. **Limitless Scalability**. To easily scale your analytics as data grows.                       | 1. **Cost Dynamics**. Careful optimisation needed to manage expenses.                 |
| 2. **Seamless Integration**. To integrate with Google Cloud services for comprehensive analytics. | 2. **Network Reliance**. Upload speed and reliability may vary based on connectivity. |
| 3. **Serverless Advantage**. Focus on analytics, not infrastructure management.                   |                                                                                       |

| **Benefits** of Uploading to **Local Postgres**                                                           | **Disadvantages** of Uploading to Local **Postgres**                                            |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 1. **Control Over Infrastructure**. Full control, ideal for specific security or compliance requirements. | 1. **Scaling**. Local databases may struggle with substantial data growth.                      |
| 2. **Lower Latency**. Minimise network latency for real-time applications.                                | 2. **Infrastructure Management**. Ongoing responsibilities may divert attention from analytics. |

## Synchronise Updates Automatically

The act of loading a CSV file from Google Cloud Storage or a Local Disk into Google BigQuery does not establish automatic synchronisation or updates. Should you make modifications to the CSV file in GCS, it becomes necessary to manually reload the updated file into BigQuery following the same procedural steps.

To streamline and automate this process, consider implementing a recurring job through Google Cloud services or configuring a cron job using the recommended commands. Alternatively, you can incorporate this automation directly within the mapping file code. For example, create a [block handler](../../../build/manifest/ethereum.md#mapping-handlers-and-filters) with a specific `modulo` to load your data in batches at predetermined intervals. These services will initiate a load job in BigQuery, ensuring your data stays synchronised effortlessly.
