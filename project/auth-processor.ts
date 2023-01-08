import { RequestQueue } from './request';

export class AuthProcessor {
  private queue: RequestQueue;

  constructor(queue: RequestQueue) {
    this.queue = queue;
  }

  public processAuth(auth: any): void {
    // Create a request object
    const request = createRequestFromAuth(auth);

    // Add the request to the queue
    this.queue.addRequest(request);
  }
}

function createRequestFromAuth(auth: any): Request {
  return {
    id: auth.id,
    endpoint: '/auth/' + auth.name,
    data: auth,
  };
}
