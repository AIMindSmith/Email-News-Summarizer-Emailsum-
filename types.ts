
export enum Category {
  IMPORTANT = 'Important News',
  NEWS = 'News',
  AI_TOOLS = 'AI Tools',
  LINKS = 'Links',
  PROMPTS = 'Prompts',
  OTHER = 'Other'
}

export interface EmailSummary {
  id: string;
  sender: string;
  community: string;
  date: string;
  category: Category;
  summary: string;
  keyLinks: string[];
  rawSubject: string;
  importance: number; // 0-10
}

export interface ArchitectureComponent {
  layer: string;
  name: string;
  description: string;
  technologies: string[];
}

export interface Feature {
  name: string;
  description: string;
  status: 'Ready' | 'Planned' | 'In Progress';
}
