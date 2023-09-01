import { useState } from 'react';
import { FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { RootList } from 'src/@types/navigation';

interface PlayersProps {
  // navigation: NativeStackNavigationProp<RootList, 'players'>
  route: RouteProp<RootList, 'players'>
}

export function Players({ route }: PlayersProps) {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState(['Sean Anthony', 'Gaveta'])

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={route.params.group}
        subtitle='adicione a galera e separe os times'
      />

      <Form>
        <Input placeholder='Nome da pessoa' autoCorrect={false} />
        <ButtonIcon icon='add' />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <Filter
              title={item}
              isActive={team === item}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>
      
      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <ListEmpty message='Não há pessoas nesse time' />}
      />

      <Button title='Remover Turma' type='SECONDARY' />
    </Container>
  );
}
