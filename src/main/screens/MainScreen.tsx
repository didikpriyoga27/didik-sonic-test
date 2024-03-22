import React, {useMemo} from 'react';
import {ActivityIndicator} from 'react-native';

import BaseLayout from '../../shared/components/BaseLayout';
import Header from '../../shared/components/Header';
import colors from '../../shared/utils/colors';
import MainSection from '../components/MainSection';
import useQueryProjects from '../hooks/useQueryProjects';

const MainScreen = () => {
  const {data, isLoading} = useQueryProjects();

  const sectionListData = useMemo(() => {
    return data?.projects
      ?.filter(project => !project.inbox_project)
      ?.sort((a, b) => a.child_order - b.child_order)
      ?.map(project => {
        const sectionInProject = data?.sections
          ?.filter(section => section.project_id === project.id)
          ?.sort((a, b) => a.section_order - b.section_order);
        return {
          id: project.id,
          title: project?.name,
          data: sectionInProject?.map(section => {
            const itemInSection = data?.items
              ?.filter(item => item.section_id === section.id)
              ?.sort((a, b) => a.child_order - b.child_order);
            return {
              id: project.id,
              title: section.name,
              data: itemInSection?.map(item => {
                return {
                  id: item.id,
                  content: item.content,
                };
              }),
            };
          }),
        };
      });
  }, [data?.items, data?.projects, data?.sections]);

  if (isLoading) {
    return;
  }

  return (
    <BaseLayout isWithPaddingBottom>
      <Header title="Home" />
      {isLoading || !data ? (
        <ActivityIndicator
          className="flex-1 items-center justify-center"
          size={'large'}
          color={colors.primary}
        />
      ) : (
        <MainSection
          {...{sectionListData}}
          data={data?.projects?.filter(project => !project.inbox_project)}
        />
      )}
    </BaseLayout>
  );
};

export default MainScreen;
