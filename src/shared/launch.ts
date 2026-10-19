import type { Contract } from '../core/model.js';
import type { NoteInput } from '../core/compass.js';
import type {
  Proposal,
  ProposalErrorCode,
  ProposalProgress,
  ProposalRequest,
} from '../proposals/model.js';

// Shared wire types. Importing these as types does not load the server or SDK in the UI.
// New routes (all require X-Iterfox-Token, including GET):
// POST /api/repositories/browse {path?} -> BrowseRepositoriesResponse
// POST /api/proposals ProposalRequest -> 202 ProposalJob
// GET /api/proposals/:id -> ProposalJob (poll until ready/failed/cancelled)
// POST /api/proposals/:id/cancel {} -> ProposalJob (also discards ready drafts)
// POST /api/preflight PreflightRequest -> LaunchPreview; no checks or run creation
// POST /api/runs AuthorizeLaunchRequest -> existing RunState and worker launch
// Use the job/proposal ID, unchanged originalGoal and edited Contract for review.
// Use preview.repository/contract/handoff and authorization.id when authorizing.
// On input changes: cancel the job, clear the preview and ignore late responses.
export interface LaunchApiError {
  error: string;
  code: ProposalErrorCode | 'not-found' | 'busy' | 'expired' | 'stale-review' | 'worker-launch';
  recoverable: true;
  issues?: { path: string; message: string }[];
  runId?: string;
}

export interface BrowseRepositoriesRequest {
  path?: string;
}
export interface BrowseRepositoriesResponse {
  path: string;
  parent: string | null;
  home: string;
  directories: { name: string; path: string }[];
  repository: { repository: string; head: string } | null;
  repositoryError?: string;
  truncated: boolean;
  notices: string[];
}

export interface ProposalJob {
  id: string;
  request: ProposalRequest;
  status: 'drafting' | 'ready' | 'failed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  timeoutMs: number;
  progress: ProposalProgress;
  history: (ProposalProgress & { at: string })[];
  proposal?: Proposal;
  error?: LaunchApiError;
}

type ProposalReviewBinding =
  { proposalId: string; originalGoal: string } | { proposalId?: never; originalGoal?: never };

export type PreflightRequest = {
  repository: string;
  project?: boolean;
  handoff?: string;
} & (
  | { configPath: string; contract?: never; proposalId?: never; originalGoal?: never }
  | ({ contract: Contract; configPath?: never } & ProposalReviewBinding)
);

export interface LaunchAuthorization {
  id: string;
  expiresAt: string;
  proposalId?: string;
}
export interface PreflightPreview {
  repository: string;
  sourceBranch: string;
  runBranch: string;
  head: string;
  dirty: boolean;
  provider: 'codex' | 'demo';
  contract: Contract;
  permissions: string[];
  requiresOperator: string[];
  limits: Contract['limits'];
  notes: string[];
}
export interface LaunchPreview extends PreflightPreview {
  handoff?: NoteInput;
  authorization: LaunchAuthorization;
}

// New inline/proposal launches must echo the reviewed preview and its receipt.
// Existing clients may still use the legacy run request without a receipt.
export type AuthorizeLaunchRequest = {
  authorized: true;
  authorizationId: string;
  repository: string;
  contract: Contract;
  handoff?: NoteInput;
} & ProposalReviewBinding;
