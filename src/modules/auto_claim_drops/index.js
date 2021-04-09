const settings = require('../../settings');
const domObserver = require('../../observers/dom');

const CLAIM_BUTTON_SELECTOR = '.chat-private-callout__header-segment';

let removeCampaignDropsListener;

class ChannelDrops {
    constructor() {
        settings.add({
            id: 'autoClaimDrops',
            name: 'Auto-Claim Campaign Drops',
            defaultValue: false,
            description: 'Automatically claim drops from campaigns',
        });

        this.loadAutoClaimCampaignDrops();

        settings.on('changed.autoClaimDrops', () => this.loadAutoClaimCampaignDrops());
    }

    loadAutoClaimCampaignDrops() {
        if (settings.get('autoClaimDrops')) {
            if (removeCampaignDropsListener) return;

            removeCampaignDropsListener = domObserver.on(
                CLAIM_BUTTON_SELECTOR,
                (node, isConnected) => {
                    if (!isConnected) return;
                    const button = node.getElementsByClassName('Lja-dZ');
                    if (button) {
                        button.click();
                    }
                }
            );

            return;
        }

        if (!removeCampaignDropsListener) return;

        removeCampaignDropsListener();
        removeCampaignDropsListener = undefined;
    }
}

module.exports = new ChannelDrops();
