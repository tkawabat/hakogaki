import Provider from '../components/l5/Provider'
import Hakogaki from '../components/l5/Hakogaki'
import HakogakiHead from '../components/l5/HakogakiHead'
import HakogakiSystem from '../components/l5/HakogakiSystem'
import HakogakiSystemGoogle from '../components/l5/HakogakiSystemGoogle'

export default function App() {
    return (
        <Provider>
            <HakogakiSystem />
            <HakogakiSystemGoogle />
            <HakogakiHead />
            <Hakogaki />
        </Provider>
    )
}
