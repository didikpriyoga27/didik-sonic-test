import React, {useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  SectionListData,
  TouchableOpacity,
} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import ChevronRightIcon from '../../shared/assets/svg/ChevronRightIcon';
import PlusIcon from '../../shared/assets/svg/PlusIcon';
import Text from '../../shared/components/Text';
import View from '../../shared/components/View';
import colors from '../../shared/utils/colors';
import useQueryProjects from '../hooks/useQueryProjects';

type Props = {
  setIsVisible: (v: boolean) => void;
  setProjectAndSectionIds: (projectId: number, sectionId: number) => void;
  setTaskId: (taskId: number) => void;
  setDefaultContentAndDescription: (
    content: string,
    description: string | null,
  ) => void;
  setModalType: (v: 'add' | 'update') => void;
};

const MainSection = ({
  setIsVisible,
  setProjectAndSectionIds,
  setTaskId,
  setDefaultContentAndDescription,
  setModalType,
}: Props) => {
  const {data, isLoading, isRefetching, refetch} = useQueryProjects();

  const [sectionId, setSectionId] = useState<number | null>();

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
              projectId: project.id,
              title: section.name,
              data: itemInSection?.map(item => {
                return {
                  id: item.id,
                  content: item.content,
                  description: item.description,
                };
              }),
            };
          }),
        };
      });
  }, [data?.items, data?.projects, data?.sections]);

  const renderSectionHeader = useCallback(
    ({section}: {section: SectionListItem}) => {
      return (
        <View
          key={section.id}
          className={
            'flex-row items-center justify-between border-b border-gray-200 p-4 font-poppins_600 dark:border-gray-600'
          }>
          <Text className="font-poppins_600">{section.title}</Text>
        </View>
      );
    },
    [],
  );

  const renderItem = useCallback(
    ({item}: {item: SectionListItem}) => {
      return (
        <View
          key={item.id}
          className={
            'space-y-4 border-b border-gray-200 p-4 pl-8 dark:border-gray-600'
          }>
          <TouchableOpacity
            onPress={() => setSectionId(sectionId === item.id ? null : item.id)}
            className="flex-row items-center">
            <Text className="flex-1">{item.title}</Text>
            <View className="flex-row items-end space-x-4">
              <View className="rounded-full bg-gray-200 px-4 py-1 dark:bg-gray-700">
                <Text className="text-xs">{item.data.length + ' items'}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setProjectAndSectionIds(item.projectId, item.id);
                  setModalType('add');
                  setIsVisible(true);
                }}
                className="h-6 w-6">
                <PlusIcon color={colors.primary} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          {sectionId === item.id && (
            <View className="space-y-4 border-t border-gray-200 pt-4 dark:border-gray-600">
              {item.data.map(i => {
                const contentUrlIndex = i.content.indexOf('(https://');
                const isUrl = contentUrlIndex > -1;
                const contentTitle = isUrl
                  ? i.content.substring(0, contentUrlIndex)
                  : i.content;
                const contentUrl = isUrl
                  ? i.content.substring(
                      contentUrlIndex + 1,
                      i.content.length - 1,
                    )
                  : '';
                return (
                  <View key={i.id}>
                    <TouchableOpacity
                      disabled={!isUrl}
                      onPress={() => InAppBrowser.open(contentUrl)}>
                      <Text
                        className={`pr-4 ${isUrl && 'text-primary underline'}`}>
                        {contentTitle}
                      </Text>
                    </TouchableOpacity>
                    {i.description && (
                      <Text className="pl-4 text-[10px] text-grey">
                        {i.description}
                      </Text>
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        setTaskId(i.id);
                        setDefaultContentAndDescription(
                          i.content,
                          i.description,
                        );
                        setModalType('update');
                        setIsVisible(true);
                      }}
                      className="absolute right-0 h-6 w-6 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600">
                      <ChevronRightIcon />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      );
    },
    [
      sectionId,
      setDefaultContentAndDescription,
      setIsVisible,
      setModalType,
      setProjectAndSectionIds,
      setTaskId,
    ],
  );

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
      {/* @ts-ignore */}
      <SectionList
        sections={sectionListData}
        {...{renderItem, renderSectionHeader, refreshControl}}
      />
    </View>
  );
};

export default MainSection;
