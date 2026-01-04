
export enum Era {
  PAST_1987 = '1987',
  FUTURE_2025 = '2025'
}

export type Alignment = 'Syntropic' | 'Entropic' | 'Assembly' | 'The Void';

export interface Metric {
  label: string;
  value: number | string;
  unit?: string;
  color: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  architect?: string;
  alignment?: Alignment;
}

export interface Architect {
  id: string;
  name: string;
  description: string;
  icon: string;
  primaryColor: string;
}
