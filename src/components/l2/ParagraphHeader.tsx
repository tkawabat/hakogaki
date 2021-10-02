import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { Checkbox } from '@mui/material/';

import ScenarioSlice, { ToggleParagraphCheckedPayload } from '../../store/ScenarioSlice';
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

export default function app(props: Props) {
    const dispatch = useDispatch();

    const toggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation(); // アコーディオンの開閉をしないようにする。

        const payload: ToggleParagraphCheckedPayload = {
            paragraphId: props.paragraphId,
        }
        dispatch(ScenarioSlice.actions.toggleParagraphChecked(payload));
    }

    return (
        <Main>
            <Left>
                <Checkbox checked={props.paragraph.checked} onClick={toggle} />
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
