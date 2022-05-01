import { client, xml, jid } from '@xmpp/client'
import observable from '@riotjs/observable'

/**
 *  NotificationService
 *
 *
 */
export default observable({

    login(username, password, service) {

        // don't login twice
        if (this.xmpp) {
            return
        }

        this.xmpp = client({
            service: service,
            username: username,
            password: password
        })

        this.xmpp.on('error', (error) => {
            this.xmpp = false
            this.trigger('error', error)
        })

        // handle if client goes online
        this.xmpp.on('online', (address) => {
            this.trigger('online', address)
        })

        this.xmpp.on('offline', () => {
            this.xmpp = false
            this.trigger('offline')
        })

        // connect
        this.xmpp.start()

    },

    logout()
    {
        this.xmpp.stop()
    }
})

