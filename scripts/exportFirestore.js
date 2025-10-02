/*
 * Firestore collection exporter
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json \
 *   COLLECTIONS=products,categories,orders,users,adminConfig \
 *   node scripts/exportFirestore.js
 */

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.resolve(__dirname, '../serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('Cannot find service account credentials at', serviceAccountPath);
  console.error('Download a JSON key from the Firebase console (Project Settings → Service Accounts) and set GOOGLE_APPLICATION_CREDENTIALS.');
  process.exit(1);
}

const collectionsEnv = process.env.COLLECTIONS;
const collections = collectionsEnv ? collectionsEnv.split(',').map((name) => name.trim()).filter(Boolean) : [
  'products',
  'categories',
  'orders',
  'users',
  'adminConfig',
];

admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
});

const db = admin.firestore();
const outputDir = path.resolve(__dirname, '../firestore-export');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function exportCollection(collectionName) {
  console.log(`Exporting ${collectionName}...`);
  const snapshot = await db.collection(collectionName).get();
  const documents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const filePath = path.join(outputDir, `${collectionName}.json`);
  await fs.promises.writeFile(filePath, JSON.stringify(documents, null, 2));
  console.log(`Saved ${documents.length} documents to ${filePath}`);
}

(async () => {
  try {
    for (const collectionName of collections) {
      await exportCollection(collectionName);
    }
    console.log('Export complete. Files written to', outputDir);
    process.exit(0);
  } catch (err) {
    console.error('Export failed:', err);
    process.exit(1);
  }
})();
