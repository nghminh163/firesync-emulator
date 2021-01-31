# FireSync
FireSync makes importing and exporting data between Firestore databases easier, especially when you want to synchronize data between Firestore Cloud and Firestore Emulator

## Sync between 2 Firestore Cloud
If you want to sync data from Firestore A to Firestore B, please following this guide:
1. Push service account key file export from Firebase Console (Firestore A) to root project folder with name is `serviceAccountKey.json` or run command `mv *.json serviceAccountKey.json`
2. Run `yarn export` or `npm run export`
3. Change current service file to different name and push new file from Firestore B like step 1
4. Run `yarn run import` or `npm run import`

## Sync between Firebase Cloud and Emulator
1. Push service account key file export from Firebase Console to root project folder with name is `serviceAccountKey.json` or run command `mv *.json serviceAccountKey.json`
2. Run `yarn export` or `npm run export`
3. Change current service file to different name and push new file from Firestore B like step 1
4. Clear all emulator database with command `curl -v -X DELETE "http://localhost:8080/emulator/v1/projects/your-project-id/databases/(default)/documents"` (Change `your-project-id` to your project id)
5. Change to emulator mode with `export FIRESTORE_EMULATOR_HOST="localhost:8080"
6. Run `yarn run import` or `npm run import`
