
export interface Briefing {
  text: string;
  imageUrl: string;
  sources: GroundingSource[];
}

export interface GroundingSource {
  uri: string;
  title: string;
}
