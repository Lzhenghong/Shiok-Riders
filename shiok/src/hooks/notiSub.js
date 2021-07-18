const subtitle = (item) => {
    switch (item.type) {
        case 'Offer':
            return 'You have received an offer from';
        case 'Accept':
            return 'Your offer is accepted by';
        case 'Reject':
            return 'Your offer is rejected by';
        default: 
            return 'You have been added as a friend by';
    }
};  

export default subtitle;