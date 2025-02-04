import {API} from '../../assets/api/api';
import type {CharacterType} from '../../assets/api/rick-and-morty-api';
import {PageWrapper} from '../../components/PageWrapper/PageWrapper';
import {CharacterCard} from '../../components/Card/CharacterCard/CharacterCard';
import {getLayoutPage} from '../../components/Layout/BaseLayout/BaseLayout';
import type {GetStaticPaths, GetStaticProps} from 'next';
import {useRouter} from 'next/router';

export const getStaticPaths: GetStaticPaths =async () =>{
    const {results} = await API.rickAndMorty.getCharacters()

    const paths = results.map(character =>({
        params: {id: String(character.id)}
    }))

    return {
        paths,
        fallback: true
    }
}

//в эту ассинхронную ф-цию приходит контекст сtx, из него нам нужны только параметры, поэтому сразу деструктуризируем
export const getStaticProps: GetStaticProps = async ({params}) => {

    const {id} = params || {}
    const character = await API.rickAndMorty.getCharacter(id as string)

    if(!character) return {
        notFound:true
    }

    return {
        props: {
            character
        }
    }
}

type PropsType = {
    character: CharacterType
}
// в props придут наши проасы из ф-ии getStaticProps
const Charater = (props: PropsType) => {
    const {character} = props

    const router = useRouter()

    const characterId = router.query.id

    if(router.isFallback) return <h1>Loading...</h1>

    const goToCharacters =() =>{
        router.push('/characters')
    }

    return (
        <PageWrapper>
            <span>id: {characterId}</span>
            <CharacterCard character={character} key={character.id}/>
            <button onClick={goToCharacters}>Go to characters</button>
        </PageWrapper>
    );
};

Charater.getLayout = getLayoutPage
//important use export default
export default Charater;