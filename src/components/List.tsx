import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '../assets/styles';

interface Props {
  data: string[];
  numColums?: number;
  titleStyle?: any;
  style?: any;
  icon?: boolean;
}

const List = (props: Props) => {
  return (
    <View style={styles.listWrapper}>
      <FlatList
        style={[styles.list, props.style]}
        data={props.data}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            {props.icon && (
              <Icon
                name="checkbox-blank-outline"
                color={colors.midnightGreen}
                size={24}
              />
            )}
            <Text style={[styles.listItemText, props.titleStyle]}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    width: 300,
  },
  listItem: {
    flexDirection: 'row',
    padding: 10,
  },
  list: {
    margin: 20,
    backgroundColor: colors.yellow,
    opacity: 0.8,
  },
  listItemText: {
    color: colors.midnightGreen,
    fontSize: 20,
    marginLeft: 5,
  },
});
export default List;
