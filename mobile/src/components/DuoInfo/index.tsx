import { View, Text, ColorValue } from 'react-native';

import { styles } from './styles';

import { THEME } from '../../theme';

interface Props {
  lable: string,
  value: string,
  colorValue?: ColorValue;
}

export function DuoInfo( { lable, value, colorValue = THEME.COLORS.TEXT } : Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {lable}
      </Text>
      <Text style={[styles.value, { color: colorValue }]}
            numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}