// export interface Overview {
//   image_url: string;
//   profiles: ProfilesEntity[];
//   release: string;
// }
export interface ProfilesEntity {
  id: string;
  target: string;
  titles: TitlesEntity[];
}
export interface TitlesEntity {
  title?: string;
  model?: string;
  vendor?: string;
}
