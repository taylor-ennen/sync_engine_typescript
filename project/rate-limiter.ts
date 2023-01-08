import { RequestQueue } from './request';

export class RateLimiter {
  private queue: RequestQueue;
  private limit: number;

  constructor(queue: RequestQueue, limit: number) {
    this.queue = queue;
    this.limit = limit;
  }

  public start(): void {
    setInterval(() => this.enforceLimit(), 1000);
  }

  private enforceLimit(): void {
    // Check the size of the queue
    if (this.queue.size > this.limit) {
      // Pause processing of the queue
      this.queue.pause();
    } else if (this.queue.isPaused) {
      // Resume processing of the queue
      this.queue.resume();
    }
  }
}