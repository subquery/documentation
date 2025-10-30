# SubQuery GraphQL Agent

The SubQuery GraphQL Agent is an intelligent AI-powered agent that revolutionizes how users interact with SubQuery and Subgraph projects. Instead of writing complex GraphQL queries manually, users can ask questions in natural language, and the agent will automatically interpret the schema, generate appropriate GraphQL queries, extract the data, and provide summarized answers.

## Overview

Traditional GraphQL query building requires deep understanding of:
- GraphQL schema structure
- Query syntax and best practices
- Entity relationships and data types
- Performance optimization techniques

The GraphQL Agent eliminates these barriers by providing an intelligent interface that bridges the gap between natural language questions and structured data retrieval.

### How It Works

1. **Schema Analysis**: The agent reads and interprets the GraphQL schema of any SubQuery or Subgraph project
2. **Query Generation**: Converts natural language questions into optimized GraphQL queries
3. **Data Extraction**: Executes the queries against the project's endpoint
4. **Intelligent Summarization**: Processes the raw data and provides human-readable answers

## Core Features

### Natural Language to GraphQL Conversion
- Ask questions in plain English: "What are the top 10 DeFi protocols by TVL?"
- Automatic conversion to complex GraphQL queries
- Handles nested queries, filters, and aggregations
- No GraphQL knowledge required

### Innovative Schema Compression Technology
The GraphQL Agent solves a fundamental challenge in AI-powered GraphQL interactions: **schema size exceeds LLM context limits**. Traditional approaches fail because:

- **Traditional**: Full GraphQL introspection schemas are ~50,000+ tokens
- **Our Approach**: Compressed entity schemas are ~500-1,000 tokens (100x smaller)
- **Context Usage**: Reduced from 80-95% to 5-10% of context window
- **Result**: Reliable, cost-effective query generation

### Entity Schema + Rules Architecture
Instead of raw GraphQL schemas, we use a revolutionary **compressed, high-density schema representation**:

1. **Entity Schema**: Project-specific domain models and relationships
2. **PostGraphile v4 Rules**: Query construction patterns for SubQuery SDK
3. **Intelligent Construction**: Agent builds queries using learned patterns
4. **Real-time Validation**: Ensures query correctness before execution

**Benefits:**
- **💰 Cost Effective**: 10-20x lower token usage than traditional approaches
- **🎯 Higher Accuracy**: Domain-specific knowledge reduces errors
- **⚡ Faster Responses**: Smaller context means faster processing
- **🔄 Scalable**: Works consistently across different LLM models

### PostGraphile v4 Pattern Recognition
The agent automatically understands SubQuery SDK-generated GraphQL patterns:
- **Entity Queries**: Single entities and collection queries with pagination
- **Advanced Filtering**: Complex filters with multiple conditions
- **Ordering & Sorting**: Multi-field ordering capabilities
- **Relationship Navigation**: Nested entity relationships

### Multi-Query Orchestration
- Breaks complex questions into multiple related queries
- Executes queries in optimal order
- Combines results from multiple data sources
- Maintains context across related queries

### Data Summarization
- Extracts key insights from large datasets
- Provides human-readable summaries
- Identifies trends and patterns
- Highlights important metrics and relationships

## Free Tier - Network App Integration

The GraphQL Agent is integrated directly into the SubQuery Network App, available on every indexing project's detail page.

### Access and Usage
- **Location**: Available on each indexing project's detail page in the Network App
- **Authentication**: No authentication required (basic web interface)
- **Cost**: Free with rate limiting

### Rate Limits
- **5 queries per day per user**
- Resets daily
- Fair usage policy applies
- Designed for exploration and testing

### Getting Started with Free Tier
1. Navigate to any indexing project in the [SubQuery Network App](https://app.subquery.network)
2. Go to the project's detail page
3. Find the GraphQL Agent interface
4. Type your question in natural language
5. Receive instant answers with data insights

## Paid Service - Graphql Agent as MCP (Coming Soon)

For users requiring higher query volumes and advanced features, we will be offering a premium MCP (Model Context Protocol) server that wraps the GraphQL Agent functionality.

### Planned Features
- **Protocol**: Model Context Protocol (MCP)
- **Deployment**: Cloud-hosted service
- **Integration**: Compatible with MCP-compliant tools and IDEs
- **Performance**: Optimized for high-throughput usage

### What to Expect
- **API Keys**: Secure authentication via unique API keys
- **Multi-tenant**: Isolated environments for each customer
- **Flexible Rate Limiting**: Based on subscription tier
- **Real-time Monitoring**: Usage tracking and analytics

### Subscription Tiers (Planned)
We plan to offer multiple subscription tiers to accommodate different usage patterns:

- **Starter**: Suitable for individual developers and small projects
- **Professional**: Ideal for growing teams and moderate usage
- **Enterprise**: Custom solutions for large organizations with high-volume needs

### Payment Methods (Planned)
- **Cryptocurrency**: SubQuery Tokens (SQT)
- **Traditional Payment**: Credit cards and wire transfers
- **Flexible Billing**: Monthly and annual subscription options

:::info Status

The paid GraphQL Agent MCP service is currently under development. Sign up for our newsletter to be notified when it launches!

:::

## Getting Started Guide

### Free Tier Quick Start
1. **Visit the Network App**: Navigate to [app.subquery.network](https://app.subquery.network)
2. **Select a Project**: Choose any indexing project to explore
3. **Access GraphQL Agent**: Find the agent interface on the project detail page
4. **Ask Questions**: Type questions in natural language
5. **Review Results**: Get instant answers with data insights

### Future Paid Service Setup (Coming Soon)
Once the MCP service launches, the setup process will include:
1. **Choose a Subscription**: Select appropriate tier based on your needs
2. **Complete Payment**: Subscribe using SQT or traditional payment methods
3. **Receive API Key**: Get your unique authentication credentials
4. **Configure MCP Client**: Set up your MCP-compatible tool or IDE
5. **Start Querying**: Begin using the GraphQL Agent with enhanced capabilities

## Usage Examples

### Simple Queries
- "How many transactions occurred yesterday?"
- "What's the current TVL of this protocol?"
- "List the top 5 users by transaction volume"

### Complex Analysis
- "Compare the growth rate of DeFi protocols vs gaming protocols over the last 30 days"
- "What patterns emerge in user behavior during market volatility?"
- "Analyze the correlation between gas prices and transaction volume"

### Data Exploration
- "What types of smart contracts are most frequently interacted with?"
- "Identify unusual transaction patterns that might indicate bot activity"
- "Show me the distribution of token holders across different wallets"

## Technical Reference

### Architecture Overview

The GraphQL Agent is built with these core components:

1. **GraphQLSource** - Connection wrapper for GraphQL endpoints with entity schema support
2. **GraphQLToolkit** - LangChain-compatible toolkit providing all GraphQL tools
3. **Agent Tools** - Individual tools for specific GraphQL operations
4. **FastAPI Server** - OpenAI-compatible API with streaming support

### Available Agent Tools

1. **`graphql_schema_info`** - Get raw entity schema with PostGraphile v4 rules
2. **`graphql_query_validator_execute`** - Combined validation and execution tool (validates queries, then executes them if valid)

### Supported GraphQL Features
- **Queries**: Standard GraphQL queries with fields, arguments, and variables
- **Fragments**: Support for query fragments and inline fragments
- **Aliases**: Field and argument aliasing for custom result structures
- **Directives**: @include and @skip directives for conditional queries
- **Variables**: Query variables for dynamic parameter passing

### PostGraphile v4 Query Patterns

The agent understands these SubQuery SDK patterns automatically:

#### Entity Queries
```graphql
# Single entity
entityName(id: "ID")

# Collection with pagination
entityNames(first: 10, filter: {field: {equalTo: "value"}}) {
  nodes { id, name }
  pageInfo { hasNextPage, endCursor }
}
```

#### Advanced Filtering
```graphql
filter: {
  fieldName: { equalTo: "value" }
  amount: { greaterThan: 100 }
  status: { in: ["active", "pending"] }
}
```

#### Ordering and Pagination
```graphql
orderBy: [FIELD_NAME_ASC, CREATED_AT_DESC]
{
  entities(first: 10, after: "cursor") {
    nodes { id, field }
    pageInfo { hasNextPage, endCursor }
  }
}
```

### Agent Workflow

The agent follows this intelligent workflow:

1. **Relevance Check**: Determines if the question relates to the project data
2. **Schema Analysis**: Loads entity schema and PostGraphile rules (once per session)
3. **Query Construction**: Builds GraphQL queries using PostGraphile patterns
4. **Validation**: Validates queries against the live GraphQL schema
5. **Execution**: Executes validated queries to get real data
6. **Summarization**: Provides user-friendly responses based on actual results

## Pricing and Billing
Coming soon

### Support Resources
- **Documentation**: Comprehensive guides and API references
- **Community Forum**: Get help from other users and developers
- **Support Tickets**: Direct support for paid subscribers
- **Status Page**: Real-time service status and incident updates

## FAQ

**What types of questions can I ask?**
You can ask any question that can be answered by the data in the SubQuery project, from simple counts to complex analytical queries.

**Can I use the GraphQL Agent with my own SubQuery/SubGraph projects?**
Yes, the GraphQL Agent can be used as an MCP (Model Context Protocol) with custom SubQuery/SubGraph projects. Configure the agent to point to your GraphQL endpoint and include the project schema and any required authentication settings.

**What's the difference between the free and paid versions?**
The free tier has rate limits (5 queries/day) while paid versions offer higher limits, priority access, and additional features.

**How does the agent handle complex queries?**
The agent automatically breaks complex questions into multiple optimized queries and combines the results intelligently.