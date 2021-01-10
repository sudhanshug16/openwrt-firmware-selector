export interface Overview {
  image_url: string;
  profiles?: ProfilesEntity[] | null;
  release: string;
}
export interface ProfilesEntity {
  id: string;
  target: string;
  titles?: TitlesEntity[] | null;
}
export interface TitlesEntity {
  title?: string;
  model?: string;
  vendor?: string;
}
