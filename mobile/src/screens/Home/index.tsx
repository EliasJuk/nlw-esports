import { useEffect, useState } from 'react';

import { View, Image, FlatList } from 'react-native';

import logoImg from '../../assets/logo-nlw-esports.png';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

import { GAMES } from '../../utils/games';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect( () => {
    fetch('http://192.168.1.7:3333/games')
      .then(response => response.json())
        .then(data => setGames(data))
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo}/>

      <Heading title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...'/>

      <FlatList 
        data={games}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <GameCard 
            data={item}
          />
        )}

        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
      />

    </View>
  );
}