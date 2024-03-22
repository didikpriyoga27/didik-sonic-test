import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Alert} from 'react-native';

import useFetch from '../../shared/api/useFetch';
import useQueryProjects from './useQueryProjects';

type Payload = {
  project_id: string;
  section_id: string;
  content: string;
  description: string;
};

export default function useMutateAddTask() {
  const {data} = useQueryProjects();

  const queryClient = useQueryClient();

  const create_uuid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    );
  };

  const fetch = useFetch<Payload, any>(args => ({
    method: 'POST',
    url: 'sync',
    data: {
      sync_token: data?.sync_token,
      resource_types: ['projects', 'items'],
      commands: [
        {
          type: 'item_add',
          temp_id: create_uuid(),
          uuid: create_uuid(),
          args,
        },
      ],
    },
  }));

  return useMutation({
    mutationFn: (args: Payload) => fetch(args),
    onSuccess: () => {
      Alert.alert('Success', 'Task added successfully');
      queryClient.invalidateQueries({queryKey: ['projects']});
    },
    onError: () => Alert.alert('Error'),
  });
}
