export const MAX_TECHNICAL_RECOVERIES = 2;
export type InterruptionCause = 'turn-timeout' | 'provider-abort' | 'transport';
export interface TechnicalInterruption {
  nodeId: string;
  at: string;
  cause: InterruptionCause;
  message: string;
  quiesced: boolean;
  retriedAt?: string;
}

// Only a provider that has joined its owned processes may permit a retry.
// A generic Error/AbortError is deliberately insufficient evidence.
export class ProviderInterruption extends Error {
  constructor(
    message: string,
    readonly kind: InterruptionCause,
    readonly quiesced: boolean,
  ) {
    super(message);
    this.name = 'ProviderInterruption';
  }
}
