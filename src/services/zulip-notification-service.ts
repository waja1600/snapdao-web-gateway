
export interface ZulipStream {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  subscribers: string[];
}

export interface ZulipMessage {
  id: string;
  streamId: string;
  topic: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  reactions: { emoji: string; users: string[] }[];
  isRead: boolean;
  mentions: string[];
}

export interface NotificationRule {
  id: string;
  userId: string;
  streamId?: string;
  keywords: string[];
  notifyOnMention: boolean;
  notifyOnAllMessages: boolean;
  emailNotification: boolean;
  pushNotification: boolean;
}

export class ZulipNotificationService {
  private streams: ZulipStream[] = [
    {
      id: 'general',
      name: 'General',
      description: 'General platform discussions',
      isPrivate: false,
      subscribers: []
    },
    {
      id: 'group-buying',
      name: 'Group Buying',
      description: 'Group buying discussions and updates',
      isPrivate: false,
      subscribers: []
    },
    {
      id: 'projects',
      name: 'Projects',
      description: 'Project management and updates',
      isPrivate: false,
      subscribers: []
    },
    {
      id: 'arbitration',
      name: 'Arbitration',
      description: 'Dispute resolution discussions',
      isPrivate: true,
      subscribers: []
    }
  ];

  private messages: ZulipMessage[] = [];
  private notificationRules: NotificationRule[] = [];

  async sendMessage(streamId: string, topic: string, content: string, senderId: string): Promise<void> {
    const message: ZulipMessage = {
      id: Date.now().toString(),
      streamId,
      topic,
      content,
      sender: {
        id: senderId,
        name: 'User Name' // This would come from user service
      },
      timestamp: new Date(),
      reactions: [],
      isRead: false,
      mentions: this.extractMentions(content)
    };

    this.messages.push(message);
    await this.processNotifications(message);
  }

  private extractMentions(content: string): string[] {
    const mentionRegex = /@(\w+)/g;
    const mentions = [];
    let match;
    
    while ((match = mentionRegex.exec(content)) !== null) {
      mentions.push(match[1]);
    }
    
    return mentions;
  }

  private async processNotifications(message: ZulipMessage): Promise<void> {
    const stream = this.streams.find(s => s.id === message.streamId);
    if (!stream) return;

    // Process mentions
    for (const mention of message.mentions) {
      await this.sendNotification({
        type: 'mention',
        userId: mention,
        title: `You were mentioned in ${stream.name}`,
        content: message.content,
        data: { messageId: message.id, streamId: message.streamId }
      });
    }

    // Process keyword notifications
    for (const rule of this.notificationRules) {
      if (this.shouldNotify(rule, message)) {
        await this.sendNotification({
          type: 'keyword',
          userId: rule.userId,
          title: `New message in ${stream.name}`,
          content: message.content,
          data: { messageId: message.id, streamId: message.streamId }
        });
      }
    }
  }

  private shouldNotify(rule: NotificationRule, message: ZulipMessage): boolean {
    if (rule.streamId && rule.streamId !== message.streamId) {
      return false;
    }

    if (rule.notifyOnAllMessages) {
      return true;
    }

    if (rule.notifyOnMention && message.mentions.includes(rule.userId)) {
      return true;
    }

    return rule.keywords.some(keyword => 
      message.content.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  private async sendNotification(notification: {
    type: string;
    userId: string;
    title: string;
    content: string;
    data: any;
  }): Promise<void> {
    // Integration with browser notifications
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.content,
        icon: '/favicon.ico'
      });
    }

    // Store notification for later retrieval
    console.log('Notification sent:', notification);
  }

  getStreamMessages(streamId: string, topic?: string): ZulipMessage[] {
    return this.messages
      .filter(message => {
        if (message.streamId !== streamId) return false;
        if (topic && message.topic !== topic) return false;
        return true;
      })
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  getStreams(): ZulipStream[] {
    return this.streams;
  }

  subscribeToStream(streamId: string, userId: string): void {
    const stream = this.streams.find(s => s.id === streamId);
    if (stream && !stream.subscribers.includes(userId)) {
      stream.subscribers.push(userId);
    }
  }

  unsubscribeFromStream(streamId: string, userId: string): void {
    const stream = this.streams.find(s => s.id === streamId);
    if (stream) {
      stream.subscribers = stream.subscribers.filter(id => id !== userId);
    }
  }

  addNotificationRule(rule: NotificationRule): void {
    this.notificationRules.push(rule);
  }

  removeNotificationRule(ruleId: string): void {
    this.notificationRules = this.notificationRules.filter(rule => rule.id !== ruleId);
  }
}

export const zulipService = new ZulipNotificationService();
