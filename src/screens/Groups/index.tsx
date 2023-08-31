import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList } from 'react-native';
import { useState } from 'react';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';
import { RootList } from 'src/@types/navigation';

interface GroupsProps {
  navigation: NativeStackNavigationProp<RootList, 'groups'>
}

export function Groups({ navigation }: GroupsProps) {
  const [groups, setGroups] = useState([])

  // Simplest way to navigate is using 'useNavigation' Context
  // const { navigate } = useNavigation()
  // navigate('new')

  function handleNewGroup() {
    navigation.navigate('new')
  }
  
  return (
    <Container>
      <Header />
      <Highlight title='Turmas' subtitle='jogue com a sua turma' />
      
      <FlatList 
        data={groups}
        keyExtractor={item => item}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        renderItem={({item}) => (<GroupCard title={item} />)}
        ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira turma?' />}
        showsVerticalScrollIndicator={false}
      />

      <Button title='Criar nova turma'  onPress={handleNewGroup} />
    </Container>
  );
}
