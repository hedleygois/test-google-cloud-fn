Deploy command (you don't need all of this): gcloud functions deploy testGCPFn --region=europe-west1 --allow-unauthenticated  --memory=128MB --runtime=nodejs10 --set-env-vars=ALPHAVANTAGE_KEY=<key>  --max-instances=1 --trigger-http
