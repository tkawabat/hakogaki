import styled from 'styled-components';

import ParagraphModel from '../../store/model/ParagraphModel';

import Center from '../l1/Center';
import Left from '../l1/Left';
import Right from '../l1/Right';
import ParagraphTitle from '../l1/ParagraphTitle';
import DeleteParagraphButton from '../l1/DeleteParagraphButton';


const Main = styled.div`
    display: flex;
    width: 100%;
`;

const Title = styled(ParagraphTitle)`
    width: 70%;
`;

type Props = {
    paragraphId: number;
    paragraph: ParagraphModel;
}

const App = (props: Props) => {

    return (
        <Main>
            <Left>
                <Title
                    paragraphId={props.paragraphId}
                    subTitle={props.paragraph.subTitle}
                />
            </Left>
            <Center>
            </Center>
            <Right>
                <DeleteParagraphButton
                    paragraphId={props.paragraphId}
                    paragraph={props.paragraph}
                />
            </Right>            
        </Main>
    );
};

export default App;
