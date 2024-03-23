import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Alert} from 'react-native';

import useFetch from '../../shared/api/useFetch';

type Payload = {
  id: string;
  content: string;
  description: string;
};

export default function useMutateUpdateTask() {
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
      resource_types: ['projects', 'items'],
      commands: [
        {
          type: 'item_update',
          uuid: create_uuid(),
          args,
        },
      ],
    },
  }));

  return useMutation({
    mutationFn: (args: Payload) => fetch(args),
    onSuccess: () => {
      Alert.alert('Success', 'Task updated successfully');
      queryClient.invalidateQueries({queryKey: ['projects']});
    },
    onError: () => Alert.alert('Error'),
  });
}
