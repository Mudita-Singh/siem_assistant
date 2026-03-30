# Architecture Diagram: Conversational SIEM Assistant

## Mermaid Diagram Source

```mermaid
graph TD
    %% Global Styling
    classDef userLayer fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef aiLayer fill:#f3e5f5,stroke:#4a148c,stroke-width:2px;
    classDef siemLayer fill:#fff3e0,stroke:#e65100,stroke-width:2px;
    classDef reportLayer fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px;
    classDef subprocess fill:#ffffff,stroke:#333,stroke-dasharray: 5 5;

    subgraph UserLayer [User Layer]
        User([Security Analyst])
        UI[Conversational Interface]
    end

    subgraph AIProcessingLayer [AI Processing Layer]
        AI[NLP Engine + Gemini LLM]
        subgraph AI_Internal [Engine Components]
            IR[Intent Recognition]
            EE[Entity Extraction]
            CM[Context Memory]
        end
        QT[Query Translator<br/>NL to KQL/DSL]
    end

    subgraph SIEMLayer [SIEM Layer]
        Wazuh[Wazuh SIEM API]
        ES[Elasticsearch Engine]
        Logs[(Log Results)]
    end

    subgraph ReportingLayer [Reporting Layer]
        TRG[Threat Report Generator]
        subgraph TRG_Internal [Reporting Components]
            LA[Log Analysis]
            Corr[Correlation]
            SS[Severity Scoring]
        end
        Report[/Human-Readable Threat Report/]
    end

    %% Flow Connections
    User -->|Queries| UI
    UI -->|Natural Language| AI
    AI --> IR
    AI --> EE
    AI --> CM
    IR & EE & CM --> QT
    QT -->|API Call| Wazuh
    Wazuh -->|Fetch Data| ES
    ES -->|Raw Logs| Logs
    Logs --> TRG
    TRG --> LA
    TRG --> Corr
    TRG --> SS
    LA & Corr & SS --> Report
    Report -.->|Feedback/Review| User

    %% Applying Styles
    class User,UI userLayer;
    class AI,AI_Internal,QT aiLayer;
    class Wazuh,ES,Logs siemLayer;
    class TRG,TRG_Internal,Report reportLayer;
    class IR,EE,CM,LA,Corr,SS subprocess;

    %% Layout Tuning
    linkStyle default stroke:#333,stroke-width:1.5px;
```

## Description
This diagram illustrates the flow of information from a security analyst's query through an AI-powered processing layer that translates intent into SIEM queries, fetches logs from Wazuh/Elasticsearch, and finally generates a correlated threat report.
