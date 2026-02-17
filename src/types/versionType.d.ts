export type ModrinthVersionType = 'alpha' | 'beta' | 'release';
export type ModrinthDependencyType = 'required' | 'optional' | 'incompatible' | 'embedded';
export type ModrinthStatus = 'listed' | 'archived' | 'draft' | 'unlisted' | 'scheduled' | 'unknown';

export interface ModrinthHashes {
  sha1?: string;
  sha512?: string;
  [key: string]: string | undefined;
}

export interface ModrinthFile {
  id: string;
  hashes: ModrinthHashes;
  url: string;
  filename: string;
  primary: boolean;
  size: number;
  file_type: string | null;
}

export interface ModrinthDependency {
  version_id: string | null;
  project_id: string | null;
  file_name: string | null;
  dependency_type: ModrinthDependencyType;
}

export interface ModrinthVersion {
  game_versions: string[];
  loaders: string[];
  id: string;
  project_id: string;
  author_id: string;
  featured: boolean;
  name: string;
  version_number: string;
  changelog: string | null;
  changelog_url: string | null;
  date_published: string;
  downloads: number;
  version_type: ModrinthVersionType;
  status: ModrinthStatus;
  requested_status: ModrinthStatus | null;
  files: ModrinthFile[];
  dependencies: ModrinthDependency[];
}

export type ModrinthVersions = ModrinthVersion[];
