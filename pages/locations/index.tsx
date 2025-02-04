import type {LocationType, ResponseType} from '../../assets/api/rick-and-morty-api';
import {PageWrapper} from '../../components/PageWrapper/PageWrapper';
import {dehydrate, useQuery} from '@tanstack/react-query';
import {API} from '../../assets/api/api';
import {QueryClient} from '@tanstack/query-core';
import {Card} from '../../components/Card/Card';
import {getLayoutPage} from '../../components/Layout/BaseLayout/BaseLayout';

const getLocations = () => {
    return fetch('https://rickandmortyapi.com/api/location', {
        method: 'GET'
    }).then(res => res.json())
}

export const getStaticProps = async () => {

    const queryClient = new QueryClient()

    queryClient.fetchQuery(['locations'], getLocations)

    const characters = await API.rickAndMorty.getCharacters()

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

const Locations = () => {

    const {data: locations} = useQuery<ResponseType<LocationType>>(['locations'], getLocations)

    if (!locations) return null

    const locationList = locations.results.map((el) => {
        return <Card name={el.name} key={el.id}/>
    })

    return (
        <PageWrapper>
            {locationList}
        </PageWrapper>
    );
};

Locations.getLayout = getLayoutPage
//important use export default
export default Locations;