import {API} from '../../assets/api/api';
import type {EpisodeType, ResponseType} from '../../assets/api/rick-and-morty-api';
import {PageWrapper} from '../../components/PageWrapper/PageWrapper';
import {Card} from '../../components/Card/Card';
import {getLayoutPage} from '../../components/Layout/BaseLayout/BaseLayout';


export const getServerSideProps = async () => {
    const episodes = await API.rickAndMorty.getEpisodes()

    if(!episodes) {
        return {
            notFound: true
        }
    }
    return {
       props: {
           episodes
       }
    }
}

type PropsType = {
    episodes: ResponseType<EpisodeType>
}
// в props придут наши проасы из ф-ии getStaticProps
const Episodes = (props: PropsType) => {
    const {episodes} = props

    const episodesList = episodes.results.map((el) =>{
        return <Card name={el.name} key={el.id}/>
    })

    return (
        <PageWrapper>
            {episodesList}
        </PageWrapper>
    );
};

Episodes.getLayout = getLayoutPage
//important use export default
export default Episodes;