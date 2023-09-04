import { useState } from 'react';
import { Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Header } from '@components/Header';
import { Container, Content, Icon } from './styles';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { RootList } from 'src/@types/navigation';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';

interface NewGroupProps {
  navigation: NativeStackNavigationProp<RootList, 'new'>
}

export function NewGroup({ navigation: { navigate } }: NewGroupProps) {
  const [group, setGroup] = useState('')

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo grupo', 'Informe o nome da turma')
      }
      
      await groupCreate(group)
      navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo grupo', error.message)
      } else {
        Alert.alert('Novo grupo', 'Não foi possível criar um novo grupo')
        console.log(error)
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title='Nova turma'
          subtitle='crie a turma para adicionar as pessoas'
        />

        <Input placeholder='Nome da turma' onChangeText={setGroup} />

        <Button
          title='Criar'
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  );
}
