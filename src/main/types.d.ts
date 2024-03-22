type Item = {
  child_order: number;
  content: string;
  id: number;
  project_id: number;
  section_id: number;
};

type Project = {
  child_order: number;
  color: string;
  created_at: string;
  id: number;
  inbox_project: boolean | null;
  is_archived: boolean;
  is_deleted: boolean;
  is_favorite: boolean;
  name: string;
  parent_id: number | null;
  shared: boolean;
  sync_id: number | null;
  view_style: 'list' | 'board';
};

type Section = {
  id: number;
  name: string;
  project_id: number;
  section_order: number;
};

type User = {
  id: number;
  fullname: string;
  email: string;
};
