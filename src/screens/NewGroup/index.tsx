import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Header } from '@components/Header';
import { Container, Content, Icon } from './styles';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { RootList } from 'src/@types/navigation';

interface NewGroupProps {
  navigation: NativeStackNavigationProp<RootList, 'new'>
}

export function NewGroup({ navigation: { navigate } }: NewGroupProps) {
  const [group, setGroup] = useState('')

  function handleNew() {
    navigate('players', { group })
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
