import { ReactNodeArray } from 'react'
import styled from 'styled-components'

import PrivacyJson from '../../lib/PrivacyJson'

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px;
    margin-bottom: 100px;
`

const ChapterTitle = styled.div`
    font-weight: 600;
    margin-top: 20px;
    margin-left: 5px;
`

const Space = styled.div`
    height: 30px;
`

const Sentence = styled.div`
    margin-left: 10px;
`

const App = () => {
    const components = PrivacyJson.chapters.map((chapter, i) => {
        const key = i + 1
        return [
            <ChapterTitle key={key}>{'第' + key + '章 ' + chapter.title}</ChapterTitle>,
            chapter.text.map((t, j) => <Sentence key={i * 1000 + j}>{t}</Sentence>),
        ]
    })

    return (
        <Main className="App">
            <Sentence>{PrivacyJson.preface}</Sentence>
            {components}
        </Main>
    )
}

export default App
