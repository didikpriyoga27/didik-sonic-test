import React, {useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  SectionListData,
  TouchableOpacity,
} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import Text from '../../shared/components/Text';
import View from '../../shared/components/View';
import colors from '../../shared/utils/colors';
import useQueryProjects from '../hooks/useQueryProjects';

const MainSection = () => {
  const {data, isLoading, isRefetching, refetch} = useQueryProjects();

  const sectionListData:
    | SectionListData<SectionListItem, SectionListHeader>[]
    | undefined = useMemo(() => {
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
              id: section.id,
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

  const renderSectionHeader = useCallback(
    ({section}: {section: SectionListHeader}) => {
      return (
        <View
          key={section.id}
          className={
            'sections-center flex-row justify-between border-b border-gray-200 p-4 dark:border-gray-600'
          }>
          <Text>{section.title}</Text>
        </View>
      );
    },
    [],
  );

  const renderItem = useCallback(({item}: {item: SectionListItem}) => {
    return (
      <View
        key={item.id}
        className={
          'space-y-4 border-b border-gray-200 p-4 pl-8 dark:border-gray-600'
        }>
        <Text>{item.title}</Text>
        <View className="space-y-4 border-t border-gray-200 pt-4 dark:border-gray-600">
          {item.data.map(i => {
            const contentUrlIndex = i.content.indexOf('(https://');
            const isUrl = contentUrlIndex > -1;
            const contentTitle = isUrl
              ? i.content.substring(0, contentUrlIndex)
              : i.content;
            const contentUrl = isUrl
              ? i.content.substring(contentUrlIndex + 1, i.content.length - 1)
              : '';
            return (
              <TouchableOpacity
                disabled={!isUrl}
                onPress={() => InAppBrowser.open(contentUrl)}>
                <Text className={`pl-4 ${isUrl && 'text-primary underline'}`}>
                  {contentTitle}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }, []);

  const refreshControl = (
    <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
  );

  if (isLoading || !sectionListData) {
    return (
      <ActivityIndicator
        className="flex-1 items-center justify-center"
        size={'large'}
        color={colors.primary}
      />
    );
  }

  return (
    <View className="flex-1">
      <Text className="p-4 font-poppins_700 text-base">Projects</Text>
      {/* @ts-ignore */}
      <SectionList
        sections={sectionListData}
        {...{renderItem, renderSectionHeader, refreshControl}}
      />
    </View>
  );
};

export default MainSection;
