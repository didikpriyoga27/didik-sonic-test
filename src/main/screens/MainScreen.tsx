import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import BaseLayout from '../../shared/components/BaseLayout';
import Header from '../../shared/components/Header';
import OutlinedButton from '../../shared/components/OutlinedButton';
import View from '../../shared/components/View';
import {StackParamList} from '../../shared/navigation/types';
import MainSection from '../components/MainSection';
import AddTaskModal from '../modals/TaskModal';

const MainScreen = () => {
  const {reset} = useNavigation<NavigationProp<StackParamList>>();

  const [isVisible, setIsVisible] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [sectionId, setSectionId] = useState(0);
  const [taskId, setTaskId] = useState(0);
  const [defaultContent, setDefaultContent] = useState('');
  const [defaultDescription, setDefaultDescription] = useState('');
  const [modalType, setModalType] = useState<'add' | 'update'>('add');

  const queryClient = useQueryClient();

  return (
    <BaseLayout isWithPaddingBottom>
      <Header title="Projects" />
      <MainSection
        {...{
          setIsVisible,
          setProjectAndSectionIds: (pId, sId) => {
            setProjectId(pId);
            setSectionId(sId);
          },
          setTaskId,
          setDefaultContentAndDescription: (content, description) => {
            setDefaultContent(content);
            setDefaultDescription(description || '');
          },
          setModalType,
        }}
      />
      <View className="p-4">
        <OutlinedButton
          text="Logout"
          onPress={() => {
            EncryptedStorage.removeItem('accessToken');
            reset({
              index: 0,
              routes: [
                {
                  name: 'LoginScreen',
                },
              ],
            });
            setTimeout(() => {
              queryClient.resetQueries({queryKey: []});
            }, 1000);
          }}
        />
      </View>
      <AddTaskModal
        {...{
          isVisible,
          setIsVisible,
          project_id: String(projectId),
          section_id: String(sectionId),
          taskId: String(taskId),
          type: modalType,
          defaultContent,
          defaultDescription,
        }}
      />
    </BaseLayout>
  );
};

export default MainScreen;
