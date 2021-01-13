export interface Profile {
  arch_packages?: string;
  build_at: string;
  default_packages?: string[] | null;
  device_packages?: string[] | null;
  id: string;
  image_prefix?: string;
  images: ImagesEntity[];
  metadata_version?: number;
  target: string;
  titles: TitlesEntity[];
  version_code: string;
  version_number: string;
}
export interface ImagesEntity {
  name: string;
  sha256: string;
  type: string;
}
export interface TitlesEntity {
  title?: string;
  model?: string;
  vendor?: string;
}
