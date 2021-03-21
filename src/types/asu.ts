export interface GetBuildResponse {
  arch_packages: string;
  bin_dir: string;
  build_at: string;
  default_packages?: string[];
  device_packages?: string[];
  enqueued_at: string;
  id: string;
  image_prefix: string;
  images?: ImagesEntity[];
  manifest: Record<string, string>;
  metadata_version: number;
  request_hash: string;
  stderr: string;
  stdout: string;
  supported_devices?: string[];
  target: string;
  titles?: TitlesEntity[];
  version_code: string;
  version_number: string;
  status?: 'queued' | 'started';
  queue_position?: number;
}

export interface ImagesEntity {
  filesystem: string;
  name: string;
  sha256: string;
  type: string;
}

export interface TitlesEntity {
  title: string;
}
