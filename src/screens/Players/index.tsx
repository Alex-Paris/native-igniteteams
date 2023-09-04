import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';

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
import { PlayerStorageDTO } from 'src/dtos/PlayerStorageDTO';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { AppError } from '@utils/AppError';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { playersRemoveByGroup } from '@storage/player/playersRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

interface PlayersProps {
  navigation: NativeStackNavigationProp<RootList, 'players'>
  route: RouteProp<RootList, 'players'>
}

export function Players({ navigation, route }: PlayersProps) {
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da nova pessoa para adicionar')
    }

    const newPlayer: PlayerStorageDTO = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(newPlayer, route.params.group)

      newPlayerNameInputRef.current?.blur()

      // Force to hide keyboard
      // Keyboard.dismiss()

      setNewPlayerName('')
      fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
      } else {
        Alert.alert('Nova pessoa', 'Não foi possível adicionar')
        console.log(error)
      }
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playersRemoveByGroup(route.params.group, playerName)
      fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Remover pessoa', error.message)
      } else {
        Alert.alert('Remover pessoa', 'Não foi possível deletar')
        console.log(error)
      }
    }
  }

  async function removeGroup() {
    try {
      await groupRemoveByName(route.params.group)
      navigation.navigate('groups')
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Remover grupo', error.message)
      } else {
        Alert.alert('Remover grupo', 'Não foi possível deletar')
        console.log(error)
      }
    }
  }

  async function handleRemoveGroup() {
    Alert.alert(
      'Remover',
      'Deseja remover o grupo?',
      [
        { text: 'Não', style: "cancel" },
        { text: 'Sim', onPress: () => removeGroup() },
      ]
    )
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(route.params.group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.log('Pessoas', 'Não foi possível carregar as pessoas do time')
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={route.params.group}
        subtitle='adicione a galera e separe os times'
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />
        <ButtonIcon icon='add' onPress={handleAddPlayer} />
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
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item.name)} />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <ListEmpty message='Não há pessoas nesse time' />}
      />

      <Button title='Remover Turma' type='SECONDARY' onPress={handleRemoveGroup} />
    </Container>
  );
}
