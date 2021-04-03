import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

if (!Bugsnag._client) {
    Bugsnag.start({
        apiKey: '76f30dd2249530ec87148098473241a9',
        plugins: [new BugsnagPluginReact()]
    })
}


export default Bugsnag