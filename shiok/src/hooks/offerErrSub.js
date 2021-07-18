const errorSubtitle = (state) => {
    switch (state.errorMessage) {
        case 'Unable to find listing':
            return 'This listing has expired';
        case 'Already submitted an offer':
            return 'Please wait for the outcome';
        default:
            return 'Please check your connection';
    }
};

export default errorSubtitle;