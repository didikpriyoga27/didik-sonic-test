import {useQuery} from '@tanstack/react-query';

import useFetch from '../../shared/api/useFetch';

type Response = {
  projects: Project[];
  user: User;
  sections: Section[];
  items: Item[];
  sync_token: string;
};

export default function useQueryProjects() {
  const fetch = useFetch<any, Response>(() => ({
    method: 'POST',
    url: 'sync',
    data: {
      resource_types: ['user', 'projects', 'sections', 'items'],
    },
  }));
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      return fetch().then(response => response.data);
    },
  });
}
