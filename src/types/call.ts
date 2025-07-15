export interface Call {
    id: string;
    eventName: string;
    description: string;
    contactEmail: string;
    callType: "speaker" | "volunteer";
    location: string;
    tags: string;
    postedDate: Date;
    createdAt: Date;
    deadline: Date | null;
    honorarium?: number;
  }