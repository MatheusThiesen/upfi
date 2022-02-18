import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { Card, CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type getImagesResponseProps = {
  data: Card[];
  after: null;
};

export default function Home(): JSX.Element {
  const getImages = async ({ pageParam = 0 }) => {
    const reponse = await api.get<getImagesResponseProps>('/api/images', {
      params: { after: pageParam },
    });

    return reponse.data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',

    getImages,
    {
      getNextPageParam: lastPage => lastPage.after,
    }
  );

  const formattedData = useMemo(() => {
    const normalized: Card[] = [];

    data?.pages?.forEach(page => {
      page?.data?.forEach(pageData => {
        normalized.push(pageData);
      });
    });

    return normalized;
  }, [data]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button marginTop={14} onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
