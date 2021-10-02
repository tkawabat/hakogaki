import { FC } from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import { store } from '../../store';
import * as C from '../../lib/Const';


interface Props {
}

const App: FC<Props> = ({ children }) => {

    return (
        <Provider store={store}>
            <SnackbarProvider autoHideDuration={C.DurationNotification}>
                {children}
            </SnackbarProvider>
        </Provider>
    );
}

export default App;