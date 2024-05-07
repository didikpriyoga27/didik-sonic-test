import {useColorScheme} from 'nativewind';
import React, {useEffect, useState} from 'react';
import {Modal, TouchableOpacity} from 'react-native';

import CloseIcon from '../../shared/assets/svg/CloseIcon';
import OutlinedButton from '../../shared/components/OutlinedButton';
import PrimaryButton from '../../shared/components/PrimaryButton';
import Text from '../../shared/components/Text';
import TextInput from '../../shared/components/TextInput';
import View from '../../shared/components/View';
import useMutateAddTask from '../hooks/useMutateAddTask';
import useMutateDeleteTask from '../hooks/useMutateDeleteTask';
import useMutateUpdateTask from '../hooks/useMutateUpdateTask';

type Props = {
  isVisible: boolean;
  setIsVisible: (v: boolean) => void;
  project_id: string;
  section_id: string;
  type?: 'add' | 'update';
  taskId?: string;
  defaultContent?: string;
  defaultDescription?: string;
};

const TaskModal = ({
  isVisible,
  setIsVisible,
  project_id,
  section_id,
  type = 'add',
  taskId = '',
  defaultContent = '',
  defaultDescription = '',
}: Props) => {
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {mutateAsync: mutateAddTask} = useMutateAddTask();
  const {mutateAsync: mutateUpdateTask} = useMutateUpdateTask();
  const {mutateAsync: mutateDeleteTask} = useMutateDeleteTask();
  const {colorScheme} = useColorScheme();

  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (type === 'update') {
      setContent(defaultContent);
      setDescription(defaultDescription);
    } else {
      setContent('');
      setDescription('');
    }
  }, [defaultContent, defaultDescription, type]);

  const handleReset = () => {
    setContent('');
    setDescription('');
    setIsLoading(false);
    setIsVisible(false);
  };

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
          <View className="flex-row items-center justify-between">
            <Text className="capitalize">{type} Task</Text>
            <TouchableOpacity className="h-8 w-8" onPress={() => handleReset()}>
              <CloseIcon color={isDark ? 'white' : 'black'} />
            </TouchableOpacity>
          </View>
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
          <View className="flex-row items-center">
            {type === 'update' && (
              <OutlinedButton
                text="Delete"
                onPress={() => {
                  mutateDeleteTask({id: taskId}).then(() => handleReset());
                }}
                className="mr-4 flex-1"
              />
            )}
            <PrimaryButton
              text="Submit"
              isLoading={isLoading}
              disabled={!content}
              className="flex-1"
              onPress={() => {
                setIsLoading(true);
                if (type === 'add') {
                  mutateAddTask({
                    content,
                    description,
                    project_id,
                    section_id,
                  }).then(() => handleReset());
                }
                if (type === 'update') {
                  mutateUpdateTask({
                    content,
                    description,
                    id: taskId,
                  }).then(() => handleReset());
                }
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TaskModal;
