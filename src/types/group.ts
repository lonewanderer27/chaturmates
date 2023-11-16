export interface CreateGroupInputs {
  academic_year_id: number;
  avatar_url: string | null;
  course: number;
  cover_url: string | null;
  description: string | null;
  name: string;
  school: number;
  semester: number;
  vanity_url: string;
}
