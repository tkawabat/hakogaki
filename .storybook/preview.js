import Provider from '../src/components/l5/Provider';


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
    (Story) => (
        <Provider>
            <Story />
        </Provider>
    ),
]