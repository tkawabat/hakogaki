import Provider from '../components/l5/Provider'
import Hakogaki from '../components/l5/Hakogaki'
import HakogakiHead from '../components/l5/HakogakiHead'
import HakogakiSystem from '../components/l5/HakogakiSystem'

export default function App() {
    return (
        <Provider>
            <HakogakiSystem />
            <HakogakiHead />
            <Hakogaki />
        </Provider>
    )
}
