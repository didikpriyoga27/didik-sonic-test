import React, {useState} from 'react';

import BaseLayout from '../../shared/components/BaseLayout';
import Header from '../../shared/components/Header';
import MainSection from '../components/MainSection';
import AddTaskModal from '../modals/AddTaskModal';

const MainScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [sectionId, setSectionId] = useState(0);

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
        }}
      />
      <AddTaskModal
        {...{
          isVisible,
          setIsVisible,
          project_id: String(projectId),
          section_id: String(sectionId),
        }}
      />
    </BaseLayout>
  );
};

export default MainScreen;
