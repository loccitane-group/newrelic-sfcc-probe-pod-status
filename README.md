# newrelic-sfcc-probe-pod-status
JS Script for NewRelic Probes to get Salesforce B2C Commerce Cloud POD status

## Install
On NewRelic, create a new Synthetic monitor with type `Endpoint availability Scripted API`, configure it to run on a regular basis (e.g. every 5mins), then on `Write script` panel paste the code in `index.js` by inserting the number of your POD on the `pod_number` constant.

## Usage
You can then create a new dashboard widget with the following NRQL query to display the last POD status
```sql
SELECT latest(custom.status) FROM SyntheticCheck FACET custom.location ORDER BY timestamp DESC SINCE 365 days ago
```

*Note: If you have multiple monitor you can add a `WHERE` clause to specify the monitor previsouly created with its ID or name.*
