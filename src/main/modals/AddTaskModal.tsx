import React, {useState} from 'react';
import {Modal} from 'react-native';

import PrimaryButton from '../../shared/components/PrimaryButton';
import Text from '../../shared/components/Text';
import TextInput from '../../shared/components/TextInput';
import View from '../../shared/components/View';
import useMutateAddTask from '../hooks/useMutateAddTask';

type Props = {
  isVisible: boolean;
  setIsVisible: (v: boolean) => void;
  project_id: string;
  section_id: string;
};

const AddTaskModal = ({
  isVisible,
  setIsVisible,
  project_id,
  section_id,
}: Props) => {
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {mutateAsync} = useMutateAddTask();

  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      transparent={true}
      onRequestClose={() => {
        setIsVisible(!isVisible);
      }}>
      <View className="flex-1 justify-center bg-black p-4 opacity-25" />
      <View className="absolute bottom-40 left-4 right-4 top-40 justify-center rounded-md bg-transparent">
        <View className="space-y-4 rounded-md p-4">
          <Text>Add Task</Text>
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Task name"
          />
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Task description"
            multiline
          />
          <PrimaryButton
            text="Submit"
            isLoading={isLoading}
            disabled={!content || !description}
            onPress={() => {
              setIsLoading(true);
              mutateAsync({content, description, project_id, section_id}).then(
                () => {
                  setContent('');
                  setDescription('');
                  setIsLoading(false);
                  setIsVisible(false);
                },
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddTaskModal;
