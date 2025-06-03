
import snapshot from '@snapshot-labs/snapshot.js';
import { toast } from "sonner";

interface SnapshotSpace {
  id: string;
  name: string;
  about: string;
  network: string;
  symbol: string;
  strategies: any[];
}

interface SnapshotProposal {
  id: string;
  title: string;
  body: string;
  choices: string[];
  start: number;
  end: number;
  snapshot: string;
  state: 'pending' | 'active' | 'closed';
  author: string;
  space: SnapshotSpace;
}

interface SnapshotVote {
  id: string;
  voter: string;
  choice: number | number[];
  proposal: string;
  space: string;
}

export class SnapshotService {
  private hub: string;
  private client: any;

  constructor() {
    this.hub = 'https://hub.snapshot.org';
    this.client = new snapshot.Client712(this.hub);
  }

  async createSpace(spaceData: {
    id: string;
    name: string;
    about: string;
    network: string;
    symbol: string;
  }): Promise<SnapshotSpace | null> {
    try {
      // Note: Space creation requires admin privileges on Snapshot
      // For demo purposes, we'll simulate this
      const space: SnapshotSpace = {
        ...spaceData,
        strategies: [
          {
            name: 'ticket',
            params: {
              symbol: 'VOTE'
            }
          }
        ]
      };

      console.log('Snapshot space would be created:', space);
      return space;
    } catch (error) {
      console.error('Error creating Snapshot space:', error);
      toast.error('Failed to create voting space');
      return null;
    }
  }

  async createProposal(proposalData: {
    space: string;
    title: string;
    body: string;
    choices: string[];
    start: Date;
    end: Date;
    type: 'single-choice' | 'approval' | 'quadratic' | 'ranked-choice' | 'weighted' | 'basic';
  }): Promise<SnapshotProposal | null> {
    try {
      const proposal = {
        space: proposalData.space,
        type: proposalData.type,
        title: proposalData.title,
        body: proposalData.body,
        choices: proposalData.choices,
        start: Math.floor(proposalData.start.getTime() / 1000),
        end: Math.floor(proposalData.end.getTime() / 1000),
        snapshot: 'latest',
        plugins: JSON.stringify({}),
        app: 'gpo-platform'
      };

      // For demo purposes, simulate proposal creation
      const simulatedProposal: SnapshotProposal = {
        id: `proposal-${Date.now()}`,
        title: proposal.title,
        body: proposal.body,
        choices: proposal.choices,
        start: proposal.start,
        end: proposal.end,
        snapshot: proposal.snapshot,
        state: 'active',
        author: 'user-address',
        space: {
          id: proposal.space,
          name: 'GPO Platform',
          about: 'Group Purchasing Organization',
          network: '1',
          symbol: 'VOTE',
          strategies: []
        }
      };

      console.log('Snapshot proposal would be created:', simulatedProposal);
      toast.success('Voting proposal created successfully');
      return simulatedProposal;
    } catch (error) {
      console.error('Error creating Snapshot proposal:', error);
      toast.error('Failed to create voting proposal');
      return null;
    }
  }

  async vote(voteData: {
    space: string;
    proposal: string;
    choice: number | number[];
    reason?: string;
  }): Promise<boolean> {
    try {
      // For demo purposes, simulate voting
      const vote: SnapshotVote = {
        id: `vote-${Date.now()}`,
        voter: 'user-address',
        choice: voteData.choice,
        proposal: voteData.proposal,
        space: voteData.space
      };

      console.log('Snapshot vote would be cast:', vote);
      toast.success('Vote cast successfully');
      return true;
    } catch (error) {
      console.error('Error casting vote:', error);
      toast.error('Failed to cast vote');
      return false;
    }
  }

  async getProposals(space: string): Promise<SnapshotProposal[]> {
    try {
      // Using GraphQL query to fetch proposals
      const query = `
        query Proposals($space: String!) {
          proposals(
            first: 20,
            skip: 0,
            where: { space: $space },
            orderBy: "created",
            orderDirection: desc
          ) {
            id
            title
            body
            choices
            start
            end
            snapshot
            state
            author
            space {
              id
              name
            }
          }
        }
      `;

      const variables = { space };
      
      const response = await fetch('https://hub.snapshot.org/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const data = await response.json();
      return data.data?.proposals || [];
    } catch (error) {
      console.error('Error fetching proposals:', error);
      return [];
    }
  }

  async getVotes(proposalId: string): Promise<SnapshotVote[]> {
    try {
      // Using GraphQL query to fetch votes
      const query = `
        query Votes($proposal: String!) {
          votes(
            first: 1000,
            skip: 0,
            where: { proposal: $proposal }
          ) {
            id
            voter
            choice
            proposal
            space
          }
        }
      `;

      const variables = { proposal: proposalId };
      
      const response = await fetch('https://hub.snapshot.org/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const data = await response.json();
      return data.data?.votes || [];
    } catch (error) {
      console.error('Error fetching votes:', error);
      return [];
    }
  }
}

export const snapshotService = new SnapshotService();
