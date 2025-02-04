import {API} from '../../assets/api/api';
import type {CharacterType, ResponseType} from '../../assets/api/rick-and-morty-api';
import {PageWrapper} from '../../components/PageWrapper/PageWrapper';
import {CharacterCard} from '../../components/Card/CharacterCard/CharacterCard';
import {getLayoutPage} from '../../components/Layout/BaseLayout/BaseLayout';


export const getStaticProps = async () => {
    const characters = await API.rickAndMorty.getCharacters()

    return {
        props: {
            characters
        }
    }
}

type PropsType = {
    characters: ResponseType<CharacterType>
}
                                    // в props придут наши проасы из ф-ии getStaticProps
const Charaters = (props: PropsType) => {
    const {characters} = props

    const charactersList = characters.results.map((el) =>{
      return <CharacterCard character={el} key={el.id}/>
    })

    return (
        <PageWrapper>
            {charactersList}
        </PageWrapper>
    );
};

Charaters.getLayout = getLayoutPage
//important use export default
export default Charaters;