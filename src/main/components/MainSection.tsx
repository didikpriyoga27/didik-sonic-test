import React, {useCallback} from 'react';
import {SectionList} from 'react-native';

import Text from '../../shared/components/Text';
import View from '../../shared/components/View';

type Props = {
  data: Project[];
  sectionListData: any;
};

const MainSection = ({sectionListData}: Props) => {
  const renderSectionHeader = useCallback(
    ({
      section,
      index,
    }: {
      section: {id: number; title: string};
      index: number;
    }) => {
      return (
        <View
          key={section.id}
          className={`sections-center flex-row justify-between border-gray-200 p-4 dark:border-gray-600 ${
            !index ? 'border-y' : 'border-b'
          }`}>
          <Text>{section.title}</Text>
        </View>
      );
    },
    [],
  );

  const renderItem = useCallback(
    ({
      item,
    }: {
      item: {id: number; title: string; data: {id: number; content: string}[]};
    }) => {
      return (
        <View
          key={item.id}
          className={
            'space-y-4 border-b border-gray-200 p-4 pl-8 dark:border-gray-600'
          }>
          <Text>{item.title}</Text>
          <View className="space-y-4">
            {item.data.map(i => {
              const contentTitle =
                i.content.indexOf('(https://') > -1
                  ? i.content.substring(0, i.content.indexOf('(https://'))
                  : i.content;
              return <Text className="pl-4">{contentTitle}</Text>;
            })}
          </View>
        </View>
      );
    },
    [],
  );

  return (
    <View className="flex-1">
      <Text className="p-4 font-poppins_700 text-base">Projects</Text>
      {/* @ts-ignore */}
      <SectionList
        sections={sectionListData}
        {...{renderItem, renderSectionHeader}}
      />
    </View>
  );
};

export default MainSection;
