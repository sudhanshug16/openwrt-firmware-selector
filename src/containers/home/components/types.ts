export type Overview = {
  branches: Branches[];
  latest: string;
  server: Server;
};

type Server = {
  contact: string;
  version: string;
};

export type AdditionalProp = {
  enabled: boolean;
  eol: string;
  extra_keys: string[];
  extra_repos: ExtraRepos;
  git_branch: string;
  name: string;
  path: string;
  path_packages: string;
  pubkey: string;
  release_date: string[];
  snapshot: boolean;
  updates: string;
  versions: string[];
};
// not included: targets (dynamic key names)

type ExtraRepos = {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
};

export type Branches = {
  additionalProp1: AdditionalProp;
  additionalProp2: AdditionalProp;
  additionalProp3: AdditionalProp;
};
