import React, { Dispatch, useState } from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { ICompanies, IResponse } from '../../Types/types';

import Card from '../Card';

const style = StyleSheet.create({
  flat: {
    height: Dimensions.get('window').width * 0.6,
    position: 'absolute',
    bottom: 0,
  },
});

interface IProps extends IResponse {
  cards: ICompanies[];
  setCard: Dispatch<React.SetStateAction<ICompanies | undefined>>;
}

const Cards: React.FC<IProps> = ({ cards, setCard, user }) => {
  const [scroll, setScroll] = useState(true);

  return (
    <FlatList
      ref={flat => {
        if (scroll === true) {
          const time = setTimeout(() => {
            flat?.scrollToOffset({ animated: true, offset: 0 });
            setScroll(false);
            clearTimeout(time);
          }, 1000);
        }
      }}
      data={cards}
      initialScrollIndex={cards.length - 1}
      bounces={true}
      horizontal={true}
      style={style.flat}
      onScroll={({ nativeEvent }) => {
        const index =
          nativeEvent.contentOffset.x / Dimensions.get('window').width + 0.1;
        setCard(cards[Math.floor(index)]);
      }}
      snapToInterval={Dimensions.get('window').width}
      keyExtractor={(item: ICompanies) => String(item.name)}
      renderItem={({ item }) => (
        <Card key={item.name} user={user} data={item} />
      )}
    />
  );
};

export default Cards;
