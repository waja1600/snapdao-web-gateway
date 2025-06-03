
import { toast } from "sonner";

interface LoomioConfig {
  apiKey: string;
  baseUrl: string;
}

interface LoomioGroup {
  id: string;
  name: string;
  description: string;
  privacy: 'open' | 'closed' | 'secret';
}

interface LoomooPoll {
  id: string;
  title: string;
  details: string;
  options: string[];
  groupId: string;
  closingAt?: Date;
}

interface LoomioComment {
  id: string;
  body: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  discussionId: string;
}

export class LoomioService {
  private config: LoomioConfig;
  
  constructor() {
    this.config = {
      apiKey: process.env.LOOMIO_API_KEY || '',
      baseUrl: 'https://www.loomio.org/api/v1'
    };
  }

  async createGroup(groupData: {
    name: string;
    description: string;
    privacy: 'open' | 'closed' | 'secret';
  }): Promise<LoomioGroup | null> {
    try {
      const response = await fetch(`${this.config.baseUrl}/groups`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          group: groupData
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create Loomio group: ${response.statusText}`);
      }

      const data = await response.json();
      return data.group;
    } catch (error) {
      console.error('Error creating Loomio group:', error);
      toast.error('Failed to create discussion group');
      return null;
    }
  }

  async createPoll(pollData: {
    title: string;
    details: string;
    options: string[];
    groupId: string;
    closingAt?: Date;
  }): Promise<LoomooPoll | null> {
    try {
      const response = await fetch(`${this.config.baseUrl}/polls`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          poll: {
            poll_type: 'proposal',
            title: pollData.title,
            details: pollData.details,
            poll_option_names: pollData.options,
            group_id: pollData.groupId,
            closing_at: pollData.closingAt?.toISOString()
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create poll: ${response.statusText}`);
      }

      const data = await response.json();
      return data.poll;
    } catch (error) {
      console.error('Error creating poll:', error);
      toast.error('Failed to create poll');
      return null;
    }
  }

  async addComment(commentData: {
    body: string;
    discussionId: string;
  }): Promise<LoomioComment | null> {
    try {
      const response = await fetch(`${this.config.baseUrl}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comment: {
            body: commentData.body,
            discussion_id: commentData.discussionId
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to add comment: ${response.statusText}`);
      }

      const data = await response.json();
      return data.comment;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
      return null;
    }
  }

  async getComments(discussionId: string): Promise<LoomioComment[]> {
    try {
      const response = await fetch(`${this.config.baseUrl}/discussions/${discussionId}/comments`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.statusText}`);
      }

      const data = await response.json();
      return data.comments || [];
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  }
}

export const loomioService = new LoomioService();
