import Provider from '../components/l5/Provider'
import Hakogaki from '../components/l5/Hakogaki'
import HakogakiHead from '../components/l5/HakogakiHead'

export default function app() {
    return (
        <Provider>
            <HakogakiHead />
            <Hakogaki />
        </Provider>
    )
}
