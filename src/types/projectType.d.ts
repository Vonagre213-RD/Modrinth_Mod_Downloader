export type ModrinthSideSupport = 'required' | 'optional' | 'unsupported';
export type ModrinthProjectType = 'mod' | 'modpack' | 'resourcepack' | 'shader';
export type ModrinthMonetizationStatus = 'monetized' | 'none';
export type ModrinthProjectStatus = 'approved' | 'rejected' | 'draft' | 'unlisted' | 'archived' | 'processing' | 'unknown';

export interface ModrinthLicense {
    id: string;
    name: string;
    url: string | null;
}

export interface ModrinthDonationUrl {
    id: string;
    platform: string;
    url: string;
}

export interface ModrinthProject {
    client_side: ModrinthSideSupport;
    server_side: ModrinthSideSupport;
    game_versions: string[];
    id: string;
    slug: string;
    project_type: ModrinthProjectType;
    team: string;
    organization: string | null;
    title: string;
    description: string;
    body: string;
    body_url: string | null;
    published: string;
    updated: string;
    approved: string;
    queued: string;
    status: ModrinthProjectStatus;
    requested_status: ModrinthProjectStatus;
    moderator_message: string | null;
    license: ModrinthLicense;
    downloads: number;
    followers: number;
    categories: string[];
    additional_categories: string[];
    loaders: string[];
    versions: string[];
    icon_url: string | null;
    issues_url: string | null;
    source_url: string | null;
    wiki_url: string | null;
    discord_url: string | null;
    donation_urls: ModrinthDonationUrl[];
    gallery: any[]; // Assuming generic structure for now as it was empty in the example
    color: number | null;
    thread_id: string | null;
    monetization_status: ModrinthMonetizationStatus;
}
