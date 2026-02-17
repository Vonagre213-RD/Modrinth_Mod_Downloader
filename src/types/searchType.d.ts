import { ModrinthSideSupport, ModrinthProjectType } from './projectType.js';

export interface ModrinthSearchHit {
    project_id: string;
    project_type: ModrinthProjectType;
    slug: string;
    author: string;
    title: string;
    description: string;
    categories: string[];
    display_categories: string[];
    versions: string[];
    downloads: number;
    follows: number;
    icon_url: string | null;
    date_created: string;
    date_modified: string;
    latest_version: string;
    license: string;
    client_side: ModrinthSideSupport;
    server_side: ModrinthSideSupport;
    gallery: string[];
    featured_gallery: string | null;
    color: number | null;
}

export interface ModrinthSearchResult {
    hits: ModrinthSearchHit[];
    offset: number;
    limit: number;
    total_hits: number;
}
