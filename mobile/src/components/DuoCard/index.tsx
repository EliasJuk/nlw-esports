import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { GameController } from 'phosphor-react-native';

import { styles } from './styles';

import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';

export interface DuoCardProps {
  hoursEnd: string;
  hoursStart: string; 
  id: string; 
  name: string;
  useVoiceChannel: boolean; 
  weekDays: string[];
  yearsPlaing: number;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo 
        lable='Nome'
        value={data.name}
      />

      <DuoInfo 
        lable='Tempo de jogo'
        value={`${data.yearsPlaing} anos`}
      />

      <DuoInfo
        lable='Disponibilidade'
        value={`${data.weekDays.length} dias \u2022 ${data.hoursStart} - ${data.hoursEnd}`}
      />

      <DuoInfo
        lable='Chamada de áudio?'
        value={`${data.useVoiceChannel ? "Sim" : "Não"}`}
        colorValue={`${data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}`}
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={onConnect}
        >

        <GameController 
          color={THEME.COLORS.TEXT}
          size={20}
        />

        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}