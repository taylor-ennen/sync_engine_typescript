import * as fs from 'fs';
import { RequestQueue } from './request';
import { AuthProcessor } from './auth-processor';
import { RateLimiter } from './rate-limiter';

// Read the credentials from a local file
const credentials: {
  project_id: string;
  private_key: string;
  client_email: string;
} = JSON.parse(fs.readFileSync('path/to/credentials.json', 'utf8'));

// Connect to the database
const db = alloydb.connect({
  projectId: credentials.project_id,
  credentials: credentials,
});

// Fetch the auths table from the database
const authsTable = db.getTable<Auth>('auths');

// Create a queue for requests
const queue = new RequestQueue('/api/endpoint');

// Create an auth processor
const authProcessor = new AuthProcessor(queue);

// Create a rate limiter
const rateLimiter = new RateLimiter(queue, 10);

// Start the rate limiter
rateLimiter.start();

// Process the auths
const auths = await authsTable.select().execute();
for (const auth of auths) {
  authProcessor.processAuth(auth);
}