import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'

import { GameParams } from '../../@types/navigation';

import { Entypo } from '@expo/vector-icons';
import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { THEME } from '../../theme';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';


/*interface RouteParams {
  id: string;
  title: string;
  bannerUrl: string;
}*/

export function Game() {
  const route = useRoute();

  const game = route.params as GameParams;
  //console.log(game.id);

  const navigation = useNavigation();
  function handleGoBack(){
    navigation.goBack();
  }

  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  useEffect( () => {
    fetch(`http://192.168.1.7:3333/games/${game.id}/ads`)
      .then(response => response.json())
        .then(data => setDuos(data))
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name="chevron-small-left"
              color={THEME.COLORS.CAPTION_300}
              size={42}
            />
          </TouchableOpacity>
          
            <Image 
              source={logoImg}
              style={styles.logo}
            />

          <View style={styles.right} />      
        </View>
          
        <Image
          source={{uri: game.bannerUrl}}
          style={styles.cover}
          resizeMode="cover"          
        />

        <Heading 
          title={game.title} 
          subtitle={'Conecte-se e comece a jogar!'}
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard 
              data={item}
              onConnect={() => {}}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                Não há anúncios publicados ainda.
              </Text>
            )}
        />
      </SafeAreaView>
    </Background>
  );
}