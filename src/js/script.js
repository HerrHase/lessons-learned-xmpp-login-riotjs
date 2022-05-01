import * as riot from 'riot'

import XmppLogin from './components/xmpp-login.riot'
import XmppContacts from './components/xmpp-contacts.riot'

// register components
riot.register('xmpp-login', XmppLogin)
riot.register('xmpp-contacts', XmppContacts)

// mount components
riot.mount('xmpp-login')
riot.mount('xmpp-contacts')